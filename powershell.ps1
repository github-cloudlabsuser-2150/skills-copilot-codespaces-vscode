# Define variables
$resourceGroupName = "MyResourceGroup"
$location = "EastUS"
$vmName = "MyVM"
$vnetName = "MyVNet"
$subnetName = "MySubnet"
$publicIpName = "MyPublicIP"
$nicName = "MyNIC"
$image = "Win2022Datacenter" # Use "UbuntuLTS" for Linux
$adminUsername = "azureuser"
$adminPassword = "P@ssw0rd123!" # Ensure this meets Azure's password complexity requirements

# Login to Azure (if not already logged in)
Connect-AzAccount

# Create a resource group
New-AzResourceGroup -Name $resourceGroupName -Location $location

# Create a virtual network
$vnet = New-AzVirtualNetwork -ResourceGroupName $resourceGroupName -Location $location `
    -Name $vnetName -AddressPrefix "10.0.0.0/16"

# Create a subnet
$subnet = Add-AzVirtualNetworkSubnetConfig -Name $subnetName -AddressPrefix "10.0.0.0/24" -VirtualNetwork $vnet
$vnet | Set-AzVirtualNetwork

# Create a public IP address
$publicIp = New-AzPublicIpAddress -ResourceGroupName $resourceGroupName -Location $location `
    -Name $publicIpName -AllocationMethod Dynamic

# Create a network interface
$nic = New-AzNetworkInterface -ResourceGroupName $resourceGroupName -Location $location `
    -Name $nicName -SubnetId $vnet.Subnets[0].Id -PublicIpAddressId $publicIp.Id

# Create the virtual machine configuration
$vmConfig = New-AzVMConfig -VMName $vmName -VMSize "Standard_DS1_v2" `
    | Set-AzVMOperatingSystem -Windows -ComputerName $vmName -Credential (New-Object PSCredential ($adminUsername, (ConvertTo-SecureString $adminPassword -AsPlainText -Force))) `
    | Set-AzVMSourceImage -PublisherName "MicrosoftWindowsServer" -Offer "WindowsServer" -Skus $image -Version "latest" `
    | Add-AzVMNetworkInterface -Id $nic.Id

# Create the virtual machine
New-AzVM -ResourceGroupName $resourceGroupName -Location $location -VM $vmConfig