let data: {name: string  | null, image: string | null} = {
  name: 'Example',
  image: 'ImageExample'
}


export async function PATCH(request: Request) {
  const {name, image} = await request.json()

  if(name!== undefined) {
    data.name = name
  }
     
  if(image !== undefined) {
    data.image = image
  }

  return Response.json({ name, image })
}

export async function GET() {
  return Response.json(data)
}

