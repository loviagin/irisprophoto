import { NextResponse, NextRequest } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY })

type Status = 'None' | 'Paid' | 'Photo taken' | 'Photo Sent' | 'Photo Edited' | 'Printed' | 'Decorated' | 'Printing' | 'Completed' | 'Completed +'
type Decor = 'None' | 'Black' | 'Silver' | 'Gold' | 'Wood' | 'Wood light' | 'White'
type Material = 'Acrilic' | 'Film' | 'Canvas' | 'Metalic' | 'Avrora' | 'Pro Satin'
type Position = 'Circle' | 'Squere' | 'Vertical' | 'Horizontal'
type Size = '20x36' | '24x48' | '24x36' | '24x30' | '24x24' | '20x30' | '20x28' | '20x24' | '20x20' | '18x24' | '16x20' | '12x36' | '13x19' | '12x18' | '12x16' | '12x12' | '11x17' | '11x14' | '8.5x11' | '8x12' | '8x10' | '8x8' | '20x36' | '20x48'
type Delivery = 'Pick up' | 'Local dilivery' | 'Post Dilivery' | 'OUTSORSING'
type Effect = 'Radiance' | 'Light beams hard' | 'Light beams' | 'Two halves of the whole 2' | 'Sand' | 'Halo hard' | 'Halo light' | 'Meteor' | 'Sparks' | 'Yin & yang meteor 2' | 'Yin & yang 2' | 'Collision water 2' | 'Collision 2' | 'Hurricane' | 'Galaxy' | 'Water' | 'Fire' | 'Explision' | 'Infinity 2'
type Companies = 'Poster Jack' | 'ZNO'

export interface Order {
    id: string
    order: string
    status: Status
    date?: string
    adress?: string
    comment?: string
    companies?: Companies
    decor: Decor
    email?: string
    frame?: string
    material: Material
    name?: string
    phone?: string
    position: Position
    size: Size
    track1?: string
    track2?: string
    typeOfDelivery: Delivery
    effect: Effect
}

export async function GET() {
    const response = await notion.databases.query({
        database_id: process.env.NEXT_PUBLIC_DATABASE_ID!,
    })

    //   console.log(JSON.stringify(response.results[0], null, 2))

    const orders: Order[] = response.results.map((item: any) => {
        return {
            id: item.id,
            order: item.properties['Order'].title?.[0]?.plain_text || '',
            status: item.properties['Status'].status?.name || '',
            date: item.properties['Date'].date?.start || '',
            adress: item.properties['Adress'].rich_text?.[0]?.plain_text || '',
            comment: item.properties['Comment'].rich_text?.[0]?.plain_text || '',
            companies: item.properties['Companies'].select?.name || '',
            decor: item.properties['Decor'].select?.name || '',
            email: item.properties['Email'].email || '',
            frame: item.properties['Frame #'].rich_text?.[0]?.plain_text || '',
            material: item.properties['Material'].select?.name || '',
            name: item.properties['Name'].rich_text?.[0]?.plain_text || '',
            phone: item.properties['Phone number'].rich_text?.[0]?.plain_text || '',
            position: item.properties['Position'].select?.name || '',
            size: item.properties['Size'].select?.name || '',
            track1: item.properties['Track #'].rich_text?.[0]?.plain_text || '',
            track2: item.properties['Track # 1'].rich_text?.[0]?.plain_text || '',
            typeOfDelivery: item.properties['Type of delivery'].select?.name || '',
            effect: item.properties['effect'].select?.name || '',
        }
    })

    return NextResponse.json(orders, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
}

export async function POST(req: NextRequest) {
    const data: Partial<Order> = await req.json()
  
    try {
      const response = await notion.pages.create({
        parent: {
          database_id: process.env.NEXT_PUBLIC_DATABASE_ID!,
        },
        properties: {
            'Order': {
              title: [
                {
                  text: {
                    content: data.order || 'Без названия',
                  },
                },
              ],
            },
            'Status': {
              status: {
                name: data.status || 'None',
              },
            },
            'Date': data.date
              ? {
                  date: {
                    start: data.date,
                  },
                }
              : { date: null },
            'Adress': {
              rich_text: [
                {
                  text: {
                    content: data.adress || '',
                  },
                },
              ],
            },
            'Comment': {
              rich_text: [
                {
                  text: {
                    content: data.comment || '',
                  },
                },
              ],
            },
            'Companies': {
              rich_text: [
                {
                  text: {
                    content: data.companies || '',
                  },
                },
              ],
            },
            'Decor': {
              status: {
                name: data.decor || 'None',
              },
            },
            'Email': {
              email: data.email || '',
            },
            'Frame #': {
              rich_text: [
                {
                  text: {
                    content: data.frame || '',
                  },
                },
              ],
            },
            'Material': {
              select: {
                name: data.material || 'Acrilic',
              },
            },
            'Name': {
              rich_text: [
                {
                  text: {
                    content: data.name || '',
                  },
                },
              ],
            },
            'Phone number': {
              rich_text: [
                {
                  text: {
                    content: data.phone || '',
                  },
                },
              ],
            },
            'Position': {
              select: {
                name: data.position || 'Circle',
              },
            },
            'Size': {
              select: {
                name: data.size || '20x36',
              },
            },
            'Track #': {
              rich_text: [
                {
                  text: {
                    content: data.track1 || '',
                  },
                },
              ],
            },
            'Track # 1': {
              rich_text: [
                {
                  text: {
                    content: data.track2 || '',
                  },
                },
              ],
            },
            'Type of delivery': {
              select: {
                name: data.typeOfDelivery || 'Pick up',
              },
            },
            'effect': {
              select: {
                name: data.effect || 'Radiance',
              },
            },
          },
      })
  
      return NextResponse.json({ success: true, id: response.id })
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
  }