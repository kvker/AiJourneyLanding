declare const T: any
type LL = {
  longitude: number
  latitude: number
}
type Lnglat = {
  lng: number
  lat: number
}

type Attraction = {
  name: string
  introduce: string
  hello: string
  introduceImageList: url[]
  ipList: url[]
  introduceVideo: string
}

type Area = {
  objectId: string
  attraction?: AV.Object
  coverImageList: url[]
  introduce: string
  lnglat: Lnglat | null
  name: string
}

type AreaSearchParams = {
  name: string
}

type ChatStyle = {
  name: string
  remind: string
  sort: number
  previousPrompt: string
  tailPrompt: string
  voiceType: number
} & LCBase

type AreaForm = Omit<Area, 'coverImageList'> & {
  coverImageList: File[]
}

type Toilet = {
  objectId: string
  attraction?: AV.Object
  coverImageList: url[]
  introduce: string
  lnglat: Lnglat | null
  name: string
}

type ToiletSearchParams = {
  name: string
}

type ToiletForm = Omit<Toilet, 'coverImageList'> & {
  coverImageList: File[]
}