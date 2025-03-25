import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY })

export async function GET() {
  const response = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_DATABASE_ID!,
  })

  const orders = response.results.map((item: any) => {
    return {
      id: item.id,
      name: item.properties.Name.title[0]?.plain_text,
      email: item.properties.Adress.adress,
    }
  })

  return NextResponse.json(orders)
}