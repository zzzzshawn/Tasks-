
const Navbar = () => {
    return (
        <>
            <nav className=" flex items-center justify-between p-2 px-10">
                <div className="logo flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50" className="">
                        <polygon points="50,10 90,90 10,90" fill="#28a745" />
                        <path fill="#fff" d="M70,40L40,80L30,70L40,60L70,40Z" />

                    </svg>
                    <h2 className="font-bold hover:text-green-600 cursor-pointer">Tasks</h2>
                </div>
                <div className="button flex justify-center items-center">
                    <button className="bg-white  border border-black font-medium text-black px-3 py-1 rounded-md hover:scale-110 transition duration-200 hover:bg-black hover:text-white" onClick={() => { window.open('https://github.com/zzzzshawn', '_blank') }}>Github</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar