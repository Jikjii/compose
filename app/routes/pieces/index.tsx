import { json } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import { getPieces } from "~/models/piece.server"

export default function(){ 
    // main page for loading in all pieces and discovering new ones
    return (
        <div>
            <h1>Pieces</h1>
        </div>
    )

}