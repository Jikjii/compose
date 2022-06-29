import { json } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import { getPieces } from "~/models/piece.server"

type LoaderData = {
    pieces: Awaited<ReturnType<typeof getPieces>>;
}

export const loader = async () => {
    return json<LoaderData>({
        pieces: await getPieces(),
    })
}

export default function(){ 
   const { pieces } = useLoaderData<LoaderData>()

   console.log(pieces)
    return (
        <div>
            <h1>Pieces</h1>
            {pieces.map((piece) => (
                <h1 key={piece.name}>
                    {piece.name}
                </h1>
            ))}
        </div>
    )

}