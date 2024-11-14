import ArtistElement from "../components/ArtistElement"
import CardElement from "../components/CardElement"

export default function Home() {
    return (
        <div className="px-6 py-4 text-[white] flex flex-col grow">
          <div className="space-y-3">
            <h1 className="font-bold text-[rgb(255,255,255)] text-xl">Artistas</h1>
            <div id="artist-scroll-id" className=" w-[90vw] flex flex-row space-x-2 overflow-y-scroll">
              <ArtistElement ArtistName="Michael Jackson"></ArtistElement>
              <ArtistElement ArtistName="Michael Jackson"></ArtistElement>
              <ArtistElement ArtistName="Michael Jackson"></ArtistElement>
              <ArtistElement ArtistName="Michael Jackson"></ArtistElement>
              <ArtistElement ArtistName="Michael Jackson"></ArtistElement>
              <ArtistElement ArtistName="Ver mais"></ArtistElement>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="font-bold text-xl">Seus gêneros</h1>
            <div className="flex">
              <CardElement CardTitle="Todos"></CardElement>
              <CardElement CardTitle="Todos"></CardElement>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="font-bold text-xl">Seus principais</h1>
            <div className="flex flex-wrap">
              <CardElement CardTitle="Todos"></CardElement>
              <CardElement CardTitle="Todos"></CardElement>
              <CardElement CardTitle="Todos"></CardElement>
              <CardElement CardTitle="Todos"></CardElement>
            </div>
          </div>
        </div>
    )
}