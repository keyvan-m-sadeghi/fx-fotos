import { HDKEY, DID, EncryptJWT, DecryptJWT } from '@functionland/fula-sec'
import { KeyChain } from '.'
import { BoxEntity } from '../realmdb/entities'
import { ethers } from 'ethers'
import { useSDK } from '@metamask/sdk-react'

export const translateOrigin = (center: number, d: number) => center - d / 2
export const convertDurationToTime = (duration: number): string => {
  const h = Math.floor(duration / 3600)
  const m = Math.floor((duration % 3600) / 60)
  const s = Math.floor(duration % 60)
  return h
    ? `${h.toString().padStart(2, '0')}:`
    : '' + `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export const getWalletImage = (walletName: string) => {
  switch (walletName) {
    case 'MetaMask':
      return require('../../assets/images/wallets/MetaMask.png')
    default:
      return null
  }
}

export const getMyDID = (password: string, signiture: string): string => {
  const ed = new HDKEY(password)
  const keyPair = ed.createEDKeyPair(signiture)
  const did = new DID(keyPair.secretKey)
  return did.did()
}

export const getMyDIDKeyPair = (
  password: string,
  signiture: string,
): {
  secretKey: Uint8Array
  pubKey: Uint8Array
} => {
  const ed = new HDKEY(password)
  const keyPair = ed.createEDKeyPair(signiture)
  return keyPair
}

export const decryptJWE = async (
  DID,
  jwe,
): Promise<{
  CID: string
  symetricKey: {
    id: string
    iv: SVGFESpecularLightingElement
    key: string
  }
} | null> => {
  if (DID && jwe) {
    //   const myTag = new TaggedEncryption(DID)
    //   const dec_jwe = await myTag.decrypt(jwe)
    //   return dec_jwe
  }
  return null
}

export const secondToTimeString = (second: number) => {
  const date = new Date(0)
  date.setSeconds(Math.floor(second))
  if (Math.floor(second) > 60 * 60) return date.toISOString().substring(11, 19)
  else return date.toISOString().substring(14, 19)
}

export const storeFulaRootCID = async (
  rootCID: string,
): Promise<false | KeyChain.UserCredentials> => {
  return await KeyChain.save(
    'rootCid',
    rootCID,
    KeyChain.Service.FULARootObject,
  )
}
export const getFulaRootCID = async (): Promise<
  false | KeyChain.UserCredentials
> => {
  return await KeyChain.load(KeyChain.Service.FULARootObject)
}
export const storeFulaPeerId = async (
  peerId: string,
): Promise<false | KeyChain.UserCredentials> => {
  return await KeyChain.save(
    'peerId',
    peerId,
    KeyChain.Service.FULAPeerIdObject,
  )
}
export const getFulaPeerId = async (): Promise<
  false | KeyChain.UserCredentials
> => {
  return await KeyChain.load(KeyChain.Service.FULAPeerIdObject)
}
export const getFulaAccountSeed = async (): Promise<
  false | KeyChain.UserCredentials
> => {
  return await KeyChain.load(KeyChain.Service.FULAAccountSeedObject)
}
export const getFulaPoolId = async (): Promise<
  false | KeyChain.UserCredentials
> => {
  return await KeyChain.load(KeyChain.Service.FULAPoolIdObject)
}
export const getFulaReplicationFactor = async (): Promise<
  false | KeyChain.UserCredentials
> => {
  return await KeyChain.load(KeyChain.Service.FULAReplicationFactorObject)
}

export const generateBloxAddress = (box: BoxEntity) => {
  if (!box || !box.peerId) {
    throw 'Blox complex address is invalid!'
  }
  if (box.connection) {
    return `${box.connection}/p2p/${box.peerId}`.trim()
  } else {
    return `/ip4/${box.ipAddress}/${box.protocol}/${box.port}/p2p/${box.peerId}`.trim()
  }
}

export interface RpcRequestParams {
  message: string
  web3Provider: ethers.providers.Web3Provider
}

export const personalSign = async ({
  chainId,
  account,
  provider,
}: {
  chainId: string | undefined
  account: string | undefined
  provider: any
}): Promise<string> => {
  if (!provider) {
    throw new Error('provider not set')
  }
  if (!chainId) {
    throw new Error('chainId not set')
  }
  if (!account) {
    throw new Error('account not set')
  }
  return await provider?.request({
    method: 'personal_sign',
    params: [chainId, account],
  })
}

export const sleep = (milliseconds: number) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), milliseconds))
