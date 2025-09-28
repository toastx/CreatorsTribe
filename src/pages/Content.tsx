import { useState, useCallback } from 'react';
import { useDropzone } from '../../node_modules/react-dropzone';
// @ts-ignore
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Upload, X, Image as ImageIcon, FileText, Video, Music, File } from 'lucide-react';

// @ts-ignore
import type { DropzoneOptions, FileRejection } from '../../node_modules/react-dropzone';

type FileWithPreview = File & {
  preview: string;
  progress?: number;
  status?: 'uploading' | 'completed' | 'error';
};

export default function ContentPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    isExclusive: false,
    price: '',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'uploading' as const,
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file, index) => {
      const interval = setInterval(() => {
        setFiles(prevFiles => {
          const updatedFiles = [...prevFiles];
          const fileIndex = updatedFiles.findIndex(f => f.name === file.name);
          if (fileIndex !== -1) {
            const currentProgress = updatedFiles[fileIndex].progress || 0;
            const newProgress = Math.min(currentProgress + Math.random() * 20, 100);
            updatedFiles[fileIndex] = {
              ...updatedFiles[fileIndex],
              progress: newProgress,
              status: newProgress === 100 ? 'completed' : 'uploading',
            };
            
            if (newProgress === 100) {
              clearInterval(interval);
            }
          }
          return updatedFiles;
        });
      }, 300);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxFiles: 10,
    multiple: true,
  } as DropzoneOptions);

  const removeFile = (index: number) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      const removedFile = newFiles.splice(index, 1)[0];
      URL.revokeObjectURL(removedFile.preview);
      return newFiles;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { ...formData, files });
    // TODO: Implement actual upload logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Content Manager</h1>
          <p className="text-muted-foreground">Upload and manage your digital content</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
          <TabsTrigger value="upload" onClick={() => setActiveTab('upload')}>
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="gallery" onClick={() => setActiveTab('gallery')}>
            <ImageIcon className="w-4 h-4 mr-2" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="analytics" onClick={() => setActiveTab('analytics')}>
            <FileText className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Content</CardTitle>
              <CardDescription>
                Upload images, videos, or other media files to share with your audience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                      isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className="w-10 h-10 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">
                        {isDragActive ? (
                          <p>Drop the files here</p>
                        ) : (
                          <p>Drag & drop files here, or click to select files</p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supports JPG, PNG, GIF, WEBP (max 10MB each)
                      </p>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Selected Files ({files.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {files.map((file, index) => (
                          <div
                            key={file.name}
                            className="relative group rounded-lg overflow-hidden border border-border bg-card"
                          >
                            <div className="aspect-square bg-muted/50 flex items-center justify-center">
                              <img
                                src={file.preview}
                                alt={file.name}
                                className="w-full h-full object-cover"
                                onLoad={() => {
                                  URL.revokeObjectURL(file.preview);
                                }}
                              />
                            </div>
                            <div className="p-3">
                              <div className="flex justify-between items-start">
                                <div className="truncate max-w-[180px]">
                                  <p className="text-sm font-medium truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remove file</span>
                                </Button>
                              </div>
                              {file.status === 'uploading' && (
                                <div className="mt-2 space-y-1">
                                  <Progress value={file.progress} className="h-2" />
                                  <p className="text-xs text-muted-foreground text-right">
                                    {Math.round(file.progress || 0)}% uploaded
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter a title for your content"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Tell us about your content"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="Add tags separated by commas"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="isExclusive"
                        name="isExclusive"
                        checked={formData.isExclusive}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor="isExclusive" className="font-normal">
                        This is exclusive content
                      </Label>
                    </div>

                    {formData.isExclusive && (
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (in tokens)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-8 space-x-3">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={files.length === 0 || formData.title.trim() === ''}>
                    Publish Content
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Your Content Gallery</CardTitle>
              <CardDescription>
                View and manage all your uploaded content in one place.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium text-foreground">No content yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by uploading a new file.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setActiveTab('upload')}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Content
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Content Analytics</CardTitle>
              <CardDescription>
                Track the performance of your content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium text-foreground">No analytics available</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload content to see analytics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
