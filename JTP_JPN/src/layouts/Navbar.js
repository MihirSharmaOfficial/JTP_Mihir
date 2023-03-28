//import useTranslation from 'next-translate/useTranslation'
import React from "react";

const Navbar = () => {

    return (
        <div className="dark:bg-black flex flex-col  bg-sky-500 p-4 sm:p-0 sm:bg-white ">
            <div className="sm:px-10 sm:py-4 flex justify-between  items-center">
                <div className="flex items-center justify-between">
                    <div>
                        <img
                            height={100}
                            width={100}
                            src="https://www.jtp.co.jp/wdp/wp-content/themes/jtp/assets/images/logo.png"
                            alt="Without Background Logo"
                        />
                    </div>
                    <h1 className="text-xl ml-12 sm:text-2xl sm:ml-4">
                        Mihir Sharma
                    </h1>
                </div>
                <div className="text-right items-center">
                    {
                        typeof window !== 'undefined' && localStorage.getItem("token")
                            ?
                            <button
                                onClick={() => { localStorage.removeItem("token"); window.location.reload() }}
                                className="basicDarkButton p-2 py-2 mt-2"
                                style={{ background: "var(--base-color)", color: "white" }}
                            >
                                Logout
                            </button>
                            :
                            <a
                                href="/auth/login"
                                className=" basicDarkButton p-2 py-2 mt-2"
                                style={{ background: "var(--base-color)", color: "white" }}
                            >Login</a>

                    }
                </div>
            </div>
        </div>
    );

};

export default Navbar;
