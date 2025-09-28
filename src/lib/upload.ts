import { toast } from '@/components/ui/use-toast';
import { create_group, upload_content } from './synapse';

interface UploadOptions {
  onProgress?: (progress: number) => void;
  onComplete?: (url: string) => void;
  onError?: (error: Error) => void;
}

export async function uploadFile(
  file: File,
  options: UploadOptions = {}
): Promise<string> {
  const { onProgress, onComplete, onError } = options;
  
  // This is a mock implementation. Replace with your actual upload logic.
  return new Promise((resolve, reject) => {
    try {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          clearInterval(interval);
          progress = 100;
          let grp = create_group();
          const cid = await upload_content(grp, file);
          // Simulate a response with a URL
          const mockUrl = URL.createObjectURL(file);
          
          if (onComplete) onComplete(mockUrl);
          resolve(mockUrl);
        }
        
        if (onProgress) onProgress(progress);
      }, 200);
      
      // Cleanup function
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Upload failed:', error);
      if (onError) onError(error as Error);
      reject(error);
    }
  });
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  // Max file size: 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  
  // Allowed file types
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ];

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File is too large. Maximum size is 10MB.',
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only images (JPEG, PNG, GIF, WEBP, SVG) are allowed.',
    };
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileIcon(type: string) {
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  return 'file';
}
