export default function StaticsElement({ title, subtitle }) {
    return (
        <div className="flex min-h-32 min-w-32 max-w-96 flex-grow flex-col justify-center space-y-1 rounded-lg bg-grey/50 px-3 py-3 text-center hover:bg-grey/20 sm:min-w-52 md:min-w-52">
            <strong className="text-lg font-black">{title}</strong>
            {subtitle && <p className="text-sm text-[white]/80">{subtitle}</p>}
        </div>
    )
}
