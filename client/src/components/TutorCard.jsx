
const TutorCard = ({ item }) => {
    return (
        <div className='min-w-[300px] w-auto flex flex-col gap-2 p-2 bg-white bg-opacity-20 rounded-2xl'>
            <div className='relative'>
                <img className='aspect-square object-cover w-[300px] rounded-xl shadow-lg' src={item.image} alt={item.name} />
                <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-xl'></div>
            </div>
            <div className='text-center bg-black py-2 rounded-2xl bg-opacity-40'>
                <span>{item.name}</span>
            </div>
        </div>
    )
}

export default TutorCard