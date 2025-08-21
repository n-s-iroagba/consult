export interface Event  {
 id: number;
 title: string;
 date: string;
 time: string;
 location: string;
 price: number;
 category: string;
 attendees: string;
 description: string;
}

export interface CryptoWallet {
    id: number;
  address: string;
  name: string;
}
export interface CryptoWalletCreationDto {
  address: string;
  name: string;

}
export interface Bank{
    id: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    swiftCode: string;
    routingNumber: string;
  };


  export interface User {
  id: number
  username: string
  email: string
}
