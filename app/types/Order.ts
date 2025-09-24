export type Status = 'None' | 'New' | 'Paid' | 'Photo taken' | 'Photo Sent' | 'Photo Edited' | 'Printed' | 'Decorated' | 'Delivering' | 'Printing' | 'Canceled' | 'Completed' | 'Completed +'
export type Decor = 'None' | 'Black' | 'Silver' | 'Gold' | 'Wood' | 'Wood light' | 'White'
export type Material = 'Acrilic' | 'Film' | 'Canvas' | 'Metalic' | 'Avrora' | 'Pro Satin'
export type Position = 'Circle' | 'Squere' | 'Vertical' | 'Horizontal'
export type Size = '20x36' | '24x48' | '24x36' | '24x30' | '24x24' | '20x30' | '20x28' | '20x24' | '20x20' | '18x24' | '16x20' | '12x36' | '13x19' | '12x18' | '12x16' | '12x12' | '11x17' | '11x14' | '8.5x11' | '8x12' | '8x10' | '8x8' | '20x36' | '20x48'
export type Delivery = 'Pick up' | 'Local dilivery' | 'Post Dilivery' | 'OUTSORSING'
export type Effect = 'Radiance' | 'Light beams hard' | 'Light beams' | 'Two halves of the whole 2' | 'Sand' | 'Halo hard' | 'Halo light' | 'Meteor' | 'Sparks' | 'Yin & yang meteor 2' | 'Yin & yang 2' | 'Collision water 2' | 'Collision 2' | 'Hurricane' | 'Galaxy' | 'Water' | 'Fire' | 'Explision' | 'Infinity 2'
export type Companies = 'Poster Jack' | 'ZNO'

export interface Order {
    id: string
    order: string
    status: Status
    date?: string
    address?: string
    comment?: string
    companies?: Companies
    decor?: Decor
    email?: string
    frame?: string
    material?: Material
    name?: string
    phone?: string
    position?: Position
    size?: Size
    track1?: string
    track2?: string
    typeOfDelivery?: Delivery
    effect?: Effect
    deliveryDate?: string
    photoUrl?: string
    createdAt?: string
    icon?: string
}