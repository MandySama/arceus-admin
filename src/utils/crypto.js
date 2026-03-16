import JSEncrypt from 'jsencrypt'

// http://web.chacuo.net/netrsakeypair

const publicKey =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAL/QpmZoaHpjdDCrQeqAHOrFh367tlgH\n' +
  'aCypUz6EAUfDeFvnu/3+MeNZWAjRemrlsprFxtKguhofdCrya82uLCUCAwEAAQ=='

const privateKey =
  'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAv9CmZmhoemN0MKtB\n' +
  '6oAc6sWHfru2WAdoLKlTPoQBR8N4W+e7/f4x41lYCNF6auWymsXG0qC6Gh90KvJr\n' +
  'za4sJQIDAQABAkBdqsMHMScL1PMRLSAEJkl4r7rJvVp+xCcv4APBfG6vnsA5KWju\n' +
  'yu0I+w2hBPXye4wfJLND6wW8JFJy4rQqJZJFAiEA8WhONg+yc8t5V1kUVYp2M6M9\n' +
  'TK2UiZ4EY4Psuy8nRzcCIQDLaOttPlhyXXfAZ2eoBVcRxYoKrZ/f07iW7Ro5PVid\n' +
  'gwIgM8O/CZ6iEGxwL4e9cX5ITFhTm66Y7E2C+Wffil/ZF08CIC1ImFDjtlEPmd9N\n' +
  'pffz6GRec9LYwGTV/5wqANKJY7b9AiBbIjH2Gelpg3DCBwVJjijy//hCoba/tH18\n' +
  'zwrbyk0bww=='

const encryptor = new JSEncrypt()
encryptor.setKey(publicKey)

const decryptor = new JSEncrypt()
decryptor.setKey(privateKey)

export const encrypt = (str) => {
  return encryptor.encrypt(str)
}

export const decrypt = (str) => {
  return decryptor.decrypt(str)
}
