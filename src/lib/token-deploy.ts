import { ethers } from "ethers";
import { useAccount } from "wagmi";


interface Window {
    ethereum?: any;
}

// Your contract's bytecode and ABI
const CONTRACT_BYTECODE = "0x608060405234801561001057600080fd5b5060405161084338038061084383398101604081905261002f91610121565b818160039081610040919061020a565b50600461004d828261020a565b50505061006733610062601260ff16600a610377565b61006c565b505061041c565b6001600160a01b0382166100c65760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546100d89190610386565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561013457600080fd5b82516001600160401b038082111561014b57600080fd5b818501915085601f83011261015f57600080fd5b81518181111561017157610171610135565b604051601f8201601f19908116603f0116810190838211818310171561019957610199610135565b816040528281526020935088848487010111156101b557600080fd5b600091505b828210156101d757848201840151818301850152908301906101ba565b600084848301015280965050505050506020830151915092509250929050565b634e487b7160e01b600052602260045260246000fd5b600181811c9082168061021e57607f821691505b60208210810361023e57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561027257600081815260208120601f850160051c8101602086101561026b5750805b601f850160051c820191505b8181101561028a57828155600101610277565b505050505050565b81516001600160401b038111156102ab576102ab610135565b6102bf816102b9845461020a565b84610244565b602080601f8311600181146102f457600084156102dc5750858301515b600019600386901b1c1916600185901b17855561028a565b600085815260208120601f198616915b8281101561032357888601518255948401946001909101908401610304565b50858210156103415787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b8085111561038c57816000190482111561037257610372610351565b8085161561037f57918102915b93841c939080029061036c565b509250929050565b6000826103a357506001610417565b816103b057506000610417565b81600181146103c657600281146103d0576103ec565b6001915050610417565b60ff8411156103e1576103e1610351565b50506001821b610417565b5060208310610133831016604e8410600b8410161715610410575081810a610417565b61041a8383610367565b806000190482111561042e5761042e610351565b029392505050565b600061044160ff84168361038b565b9392505050565b61041880610450600039600063800a00396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461010757806370a082311461011657806395d89b411461013f578063a9059cbb14610147578063dd62ed3e1461015a57600080fd5b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100d957806323b872dd146100eb575b600080fd5b6100a061018d565b6040516100ad91906102c1565b60405180910390f35b6100c96100c4366004610332565b61021f565b60405190151581526020016100ad565b6002545b6040519081526020016100ad565b6100c96100f936600461035c565b610239565b604051601281526020016100ad565b6100dd610124366004610398565b6001600160a01b031660009081526020819052604090205490565b6100a061025d565b6100c9610155366004610332565b61026c565b6100dd6101683660046103ba565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461019c906103ed565b80601f01602080910402602001604051908101604052809291908181526020018280546101c8906103ed565b80156102155780601f106101ea57610100808354040283529160200191610215565b820191906000526020600020905b8154815290600101906020018083116101f857829003601f168201915b5050505050905090565b60003361022d81858561027a565b60019150505b92915050565b60003361024785828561039e565b610252858585610320565b506001949350505050565b60606004805461019c906103ed565b60003361022d818585610320565b6001600160a01b0383166102dc5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084015b60405180910390fd5b6001600160a01b03821661033d5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016102d3565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383166103845760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016102d3565b6001600160a01b0382166103e65760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f2061646472604482015262657373360e81b60648201526084016102d3565b6001600160a01b0383166000908152602081905260409020548181101561045e5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016102d3565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a350505050565b600060208083528351808285015260005b818110156104ee578581018301518582016040015282016104d2565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461052657600080fd5b919050565b6000806040838503121561053e57600080fd5b6105478361050f565b946020939093013593505050565b60008060006060848603121561056a57600080fd5b6105738461050f565b92506105816020850161050f565b9150604084013590509250925092565b6000602082840312156105a357600080fd5b6105ac8261050f565b9392505050565b600080604083850312156105c657600080fd5b6105cf8361050f565b91506105dd6020840161050f565b90509250929050565b600181811c908216806105fa57607f821691505b60208210810361061a57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561023357610233610620565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146106c85781811015610699576040516360bb26bb60e11b81526004810192909252602482015260448101839052606401610320565b6106c8848484840361039e565b50505050565b8082018082111561023357610233610620565b505050565b6000600019820506c2815b6000191982151516610703576107036107ed565b500190565b634e487b7160e01b600052603260045260246000fd5b60006001820161072e5761072e6107ed565b5060010190565b8183823760009101908152919050565b6000825161075e818460208701610804565b9190910192915050565b81835181602085010183918060005b838110156107935781518752602082019650602081019050610777565b50506000910152505050565b60208152600082356020830152600060208401356107c76107c182610f2f565b84610db0565b80604085015260408401935050600080fd5b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60005b8381101561081f578181015183820152602001610807565b50506000910152565b6000825161083a818460208701610804565b919091019291505056"; // Add your compiled bytecode here

const CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "string", "name": "_name", "type": "string"},
            {"internalType": "string", "name": "_symbol", "type": "string"}
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
            {"indexed": true, "internalType": "address", "name": "spender", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
            {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "owner", "type": "address"},
            {"internalType": "address", "name": "spender", "type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "spender", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "to", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "from", "type": "address"},
            {"internalType": "address", "name": "to", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

class TokenDeployer {
    private provider: any;
    private signer: any;
    private deployedContract: any;
    private contractAddress: string = '';

    
    public async deployToken(): Promise<void> {
        this.signer = useAccount()
        this.provider = useAccount().connector.getProvider();
        const nameInput = document.getElementById('tokenName') as HTMLInputElement;
        const symbolInput = document.getElementById('tokenSymbol') as HTMLInputElement;
        const deployBtn = document.getElementById('deployBtn') as HTMLButtonElement;

        if (!nameInput.value.trim() || !symbolInput.value.trim()) {
            this.showStatus('Please enter both token name and symbol', 'error');
            return;
        }

        if (!this.signer) {
            this.showStatus('Please connect your wallet first', 'error');
            return;
        }

        deployBtn.disabled = true;
        this.showStatus('Deploying token contract...', 'info');

        try {
            // Create contract factory
            const contractFactory = new ethers.ContractFactory(
                CONTRACT_ABI,
                CONTRACT_BYTECODE,
                this.signer
            );

            // Deploy the contract
            const deployTransaction = await contractFactory.deploy(
                nameInput.value.trim(),
                symbolInput.value.trim()
            );

            this.showStatus(`Transaction submitted! Hash: ${deployTransaction.deploymentTransaction.toString}`, 'info');

            // Wait for deployment to complete
            const deployedContract = await deployTransaction.getAddress();
            this.contractAddress = deployedContract

            this.showStatus(
                `Token deployed successfully! Contract Address: ${this.contractAddress}`,
                'success'
            );

            // Show interaction section
            document.getElementById('interactionSection')!.style.display = 'block';
            await this.displayTokenInfo();

        } catch (error: any) {
            console.error('Deployment error:', error);
            this.showStatus(`Deployment failed: ${error.message}`, 'error');
        } finally {
            deployBtn.disabled = false;
        }
    }

    public async displayTokenInfo(): Promise<void> {
        if (!this.deployedContract) {
            this.showStatus('No contract deployed yet', 'error');
            return;
        }

        try {
            const name = await this.deployedContract.name();
            const symbol = await this.deployedContract.symbol();
            const decimals = await this.deployedContract.decimals();
            const totalSupply = await this.deployedContract.totalSupply();
            const ownerAddress = await this.signer.getAddress();
            const ownerBalance = await this.deployedContract.balanceOf(ownerAddress);

            const infoDiv = document.getElementById('tokenInfo')!;
            infoDiv.innerHTML = `
                <p><strong>Contract Address:</strong> ${this.contractAddress}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Symbol:</strong> ${symbol}</p>
                <p><strong>Decimals:</strong> ${decimals}</p>
                <p><strong>Total Supply:</strong> ${ethers.formatUnits(totalSupply, decimals)} ${symbol}</p>
                <p><strong>Your Balance:</strong> ${ethers.formatUnits(ownerBalance, decimals)} ${symbol}</p>
                <p><strong>Owner Address:</strong> ${ownerAddress}</p>
            `;
        } catch (error: any) {
            this.showStatus(`Failed to fetch token info: ${error.message}`, 'error');
        }
    }

    private showStatus(message: string, type: 'success' | 'error' | 'info'): void {
        const statusDiv = document.getElementById('deployStatus')!;
        statusDiv.innerHTML = `<div class="status ${type}">${message}</div>`;
        
        // Auto-clear info messages after 5 seconds
        if (type === 'info') {
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        }
    }
}

// Global functions for HTML onclick handlers
let tokenDeployer: TokenDeployer;

window.addEventListener('load', () => {
    tokenDeployer = new TokenDeployer();
});

function deployToken(): void {
    tokenDeployer.deployToken();
}

function refreshTokenInfo(): void {
    tokenDeployer.displayTokenInfo();
}

// Handle account changes
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask');
        } else {
            location.reload(); // Reload to reconnect with new account
        }
    });

    window.ethereum.on('chainChanged', (chainId: string) => {
        location.reload(); // Reload on network change
    });
}
