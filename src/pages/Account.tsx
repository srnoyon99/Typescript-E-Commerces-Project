import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    address: string;
    city: string;
    postalCode: string;
}

const Account: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({
        firstName: "",
        lastName: "",
        email: currentUser?.email || "",
        number: "",
        address: "",
        city: "",
        postalCode: "",
    });
    const [tempProfile, setTempProfile] = useState<UserProfile>(profile);
    const fromPath = (location.state as { from?: string } | undefined)?.from;

    // Load profile from localStorage, but reset when a new Gmail logs in
    useEffect(() => {
        const savedProfile = localStorage.getItem("userProfile");
        const currentEmail = currentUser?.email || "";

        if (savedProfile) {
            const loadedProfile = JSON.parse(savedProfile) as UserProfile;

            if (loadedProfile.email && currentEmail && loadedProfile.email !== currentEmail) {
                // New Gmail login: clear old profile and start fresh for the new email
                const initialProfile: UserProfile = {
                    firstName: "",
                    lastName: "",
                    email: currentEmail,
                    number: "",
                    address: "",
                    city: "",
                    postalCode: "",
                };
                setProfile(initialProfile);
                setTempProfile(initialProfile);
                localStorage.setItem("userProfile", JSON.stringify(initialProfile));
                return;
            }

            setProfile(loadedProfile);
            setTempProfile(loadedProfile);
            return;
        }

        if (currentEmail) {
            const initialProfile: UserProfile = {
                firstName: "",
                lastName: "",
                email: currentEmail,
                number: "",
                address: "",
                city: "",
                postalCode: "",
            };
            setProfile(initialProfile);
            setTempProfile(initialProfile);
        }
    }, [currentUser]);

    useEffect(() => {
        if (fromPath) {
            setIsEditing(true);
        }
    }, [fromPath]);

    // Extract name from email if it contains a pattern like "firstname.lastname@domain.com"
    const extractNameFromEmail = (email: string) => {
        const match = email.match(/^([^.]+)\.([^@]+)@/);
        if (match) {
            return { firstName: match[1], lastName: match[2] };
        }
        return { firstName: "", lastName: "" };
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setTempProfile(profile);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTempProfile(profile);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTempProfile({
            ...tempProfile,
            [name]: value,
        });
    };

    const handleSaveChanges = () => {
        // Validate required fields
        if (
            !tempProfile.firstName.trim() ||
            !tempProfile.lastName.trim() ||
            !tempProfile.number.trim() ||
            !tempProfile.address.trim() ||
            !tempProfile.city.trim() ||
            !tempProfile.postalCode.trim()
        ) {
            alert("Please complete all required fields before saving.");
            return;
        }

        setProfile(tempProfile);
        localStorage.setItem("userProfile", JSON.stringify(tempProfile));
        setIsEditing(false);

        if (fromPath) {
            navigate(fromPath, { replace: true });
        }
    };

    const userNameFromEmail = extractNameFromEmail(profile.email);
    const displayName = profile.firstName || userNameFromEmail.firstName || "User";

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Breadcrumb + Welcome */}
                <div className="flex items-center justify-between text-sm mb-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-[14px]">
                                <BreadcrumbLink>
                                    <Link to={"/"}>Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <SlashIcon className="w-3 h-3" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link to={"/account"}>My Account</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <span className="text-gray-700">
                        Welcome! <span className="text-red-500 font-medium">{displayName}</span>
                    </span>
                </div>

                {/* Account Container */}
                <div className="grid grid-cols-12 gap-8 font-poppins">
                    {/* Sidebar */}
                    <aside className="col-span-3 space-y-6">
                        <div>
                            <h3 className="font-medium mb-4">Manage My Account</h3>
                            <ul className="space-y-2 pl-8.5">
                                <li className="hover:text-button2 text-gray-500 font-poppins cursor-pointer">
                                    My Profile
                                </li>
                                <li className="text-gray-500 hover:text-button2 cursor-pointer">
                                    Address Book
                                </li>
                                <li className="text-gray-500 hover:text-button2 cursor-pointer">
                                    My Payment Options
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">My Orders</h3>
                            <ul className="space-y-2 pl-8.5">
                                <li className="text-gray-500 hover:text-button2 cursor-pointer">
                                    My Returns
                                </li>
                                <li className="text-gray-500 hover:text-button2 cursor-pointer">
                                    My Cancellations
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">My Wishlist</h3>
                        </div>
                    </aside>

                    {/* Profile Edit Form */}
                    <div className="col-span-9 font-poppins bg-white shadow-contact rounded-sm py-10 px-20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-medium text-button2 mb-6">
                                    Edit Your Profile
                                </h2>
                            </div>

                            {!isEditing && (
                                <button
                                    onClick={handleEditClick}
                                    className="cursor-pointer hover:opacity-75 transition"
                                    title="Edit Profile"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <form className="grid grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label className="block text-sm mb-2">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={isEditing ? tempProfile.firstName : profile.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First name"
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100 h-[50px] px-4 text-gray-600 outline-none disabled:opacity-60"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm mb-2">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={isEditing ? tempProfile.lastName : profile.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last name"
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100 h-[50px] px-4 text-gray-600 outline-none disabled:opacity-60"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm mb-2">
                                    Gmail Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    disabled
                                    placeholder="Your email"
                                    className="w-full bg-gray-100 h-[50px] px-4 text-gray-600 outline-none opacity-60"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Your login Gmail is saved and cannot be changed here.
                                </p>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="number"
                                    value={isEditing ? tempProfile.number : profile.number}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full bg-gray-100 h-[50px] px-4 text-gray-600 outline-none disabled:opacity-60"
                                    placeholder="Your Number"
                                />
                            </div>
                        </form>

                        {/* Address */}
                        <div className="mt-6">
                            <label className="block text-sm mb-2">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={isEditing ? tempProfile.address : profile.address}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="w-full bg-gray-100 h-[50px] px-4 text-gray-600 outline-none disabled:opacity-60"
                                placeholder="Your Address"
                            />
                        </div>

                        <form className="grid grid-cols-2 gap-6 mt-6">
                            {/* City */}
                            <div>
                                <label className="block text-sm mb-2">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={isEditing ? tempProfile.city : profile.city}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="City"
                                    className="w-full bg-gray-100 h-[50px] px-4 text-gray-600 outline-none disabled:opacity-60"
                                />
                            </div>

                            {/* Postal Code */}
                            <div>
                                <label className="block text-sm mb-2">
                                    Postal Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={isEditing ? tempProfile.postalCode : profile.postalCode}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="Postal Code"
                                    className="w-full bg-gray-100 h-[50px] px-4 text-gray-600 outline-none disabled:opacity-60"
                                />
                            </div>
                        </form>

                        {/* Buttons */}
                        {isEditing && (
                            <div className="col-span-2 flex justify-end gap-8 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="text-gray-600 hover:text-black font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveChanges}
                                    className="bg-button2 hover:bg-red-600 transition-all duration-300 cursor-pointer text-white font-medium font-poppins px-8 lg:px-12 py-2 lg:py-4 rounded-sm"
                                >
                                    Save Change
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Account;
