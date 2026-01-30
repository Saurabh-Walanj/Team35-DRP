import React from 'react'
import { Link } from 'react-router-dom'

export const HeroSection = () => {
    return (
        <div>
            <section className="relative bg-cover bg-center bg-no-repeat py-24 px-8"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 61, 130, 0.75), rgba(26, 26, 46, 0.75)), url('/pic1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"
                }}>
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-5xl mx-auto text-center z-10">
                    <h1 className="text-3xl text-white md:text-6xl font-semibold mb-6" style={{ fontFamily: "sans-serif" }}>
                        Digital Ration Distribution System
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Transparent, Efficient, Fair Food Security for All
                    </p>


                    <div className="flex justify-center space-x-4">
                        <Link
                            to="/register"
                            className="px-8 py-4 bg-[#FF6B35] text-white rounded-md text-lg font-semibold hover:bg-[#E55A25] transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/about"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-md text-lg font-semibold hover:bg-white hover:text-[#003D82] transition-all duration-300"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
