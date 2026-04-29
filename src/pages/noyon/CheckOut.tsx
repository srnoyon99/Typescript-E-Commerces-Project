import { Link, useNavigate } from "react-router"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../../components/ui/breadcrumb"
import { SlashIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"


interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    address: string;
    city: string;
    postalCode: string;
}

const CheckOut: React.FC = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isProfileComplete, setIsProfileComplete] = useState(false);

    useEffect(() => {
        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
            const loadedProfile = JSON.parse(savedProfile);
            setProfile(loadedProfile);
            
            // Check if all required fields are filled
            const isComplete = 
                loadedProfile.firstName?.trim() &&
                loadedProfile.lastName?.trim() &&
                loadedProfile.email?.trim() &&
                loadedProfile.number?.trim() &&
                loadedProfile.address?.trim() &&
                loadedProfile.city?.trim() &&
                loadedProfile.postalCode?.trim();
            
            setIsProfileComplete(!!isComplete);
        }
    }, []);

    const handleEditProfile = () => {
        navigate("/account");
    };

    const handlePlaceOrder = () => {
        if (!isProfileComplete) {
            alert("Please complete your profile information before placing an order.");
            handleEditProfile();
            return;
        }
        // Proceed with order placement logic
        alert("Order placed successfully!");
    };

    return (
        <section>
            <div className="container pt-20">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-[14px] ">
                            <BreadcrumbLink >
                                <Link to={"/account"}>Account</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink >
                                <Link to={"/account"}>My Account</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink >
                                <Link to={"/shop"}>Product</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink >
                                <Link to={"/cart"}>View Cart</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink >
                                <Link to={"/checkout"}>CheckOut</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid md:grid-cols-2 gap-10 mt-20 justify-between">
                    <BillingForm profile={profile} onEditProfile={handleEditProfile} />

                    <div className="max-w-[526px] ">
                        <OrderSummary profileCity={profile?.city} />
                        <PaymentOptions />
                        <CouponSection />
                        <button 
                            onClick={handlePlaceOrder}
                            disabled={!isProfileComplete}
                            className={`w-full bg-button2 hover:bg-red-600 transition-all duration-300 cursor-pointer text-white font-medium font-poppins px-8 lg:px-12 ml-5 lg:ml-0 py-2 lg:py-4 rounded-sm ${
                                !isProfileComplete ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {isProfileComplete ? "Place Order" : "Complete Profile to Order"}
                        </button>
                        {!isProfileComplete && (
                            <button
                                onClick={handleEditProfile}
                                className="w-full mt-3 border border-button2 text-button2 py-3 rounded-sm hover:bg-button2 hover:text-white transition"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default CheckOut


const BillingForm: React.FC<{ profile: UserProfile | null; onEditProfile: () => void }> = ({ profile, onEditProfile }) => {
    return (
        <div className=" pl-5 lg:pl-0 max-w-[470px] space-y-4">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-inter leading-7.5 tracking-wide font-medium">Billing Details</h2>
                {!profile?.firstName && (
                    <button
                        onClick={onEditProfile}
                        className="text-button2 text-sm font-medium hover:underline"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <form className="space-y-8 font-poppins">
                <div>
                    <label className="block text-gray-400 mb-2">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={profile?.firstName || ""}
                        readOnly
                        className="w-full bg-secondary border rounded-sm p-2.5 opacity-60"
                        placeholder={profile?.firstName ? profile.firstName : "Not filled"}
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={profile?.lastName || ""}
                        readOnly
                        className="w-full bg-secondary border rounded-sm p-2.5 opacity-60"
                        placeholder={profile?.lastName ? profile.lastName : "Not filled"}
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={profile?.address || ""}
                        readOnly
                        className="w-full border bg-secondary rounded-sm p-2.5 opacity-60"
                        placeholder={profile?.address ? profile.address : "Not filled"}
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Town/City <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={profile?.city || ""}
                        readOnly
                        className="w-full border bg-secondary rounded-sm p-2.5 opacity-60"
                        placeholder={profile?.city ? profile.city : "Not filled"}
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={profile?.number || ""}
                        readOnly
                        className="w-full border bg-secondary rounded-sm p-2.5 opacity-60"
                        placeholder={profile?.number ? profile.number : "Not filled"}
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={profile?.email || ""}
                        readOnly
                        className="w-full border bg-secondary rounded-sm p-2.5 opacity-60"
                        placeholder={profile?.email ? profile.email : "Not filled"}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input type="checkbox" className="accent-red-500 w-4 h-4" />
                    <label className="text-sm text-gray-700">
                        Save this information for faster check-out next time
                    </label>
                </div>
            </form>
        </div>
    );
};

const OrderSummary: React.FC<{ profileCity?: string }> = ({ profileCity }) => {
    const { cart } = useSelector((state: RootState) => state.cart);
    const subtotal = cart.reduce((acc, item) => acc + item.subtotal, 0);
    const shipping = profileCity?.toLowerCase().includes("dhaka") ? 100 : 150;
    const total = subtotal + shipping;

    return (
        <div className=" pl-5 lg:pl-0 w-full mb-8 space-y-6">
            <div className="border-b pb-3">
                <h2 className="text-3xl font-medium mb-6">Order Summary</h2>
                {cart.length === 0 ? (
                    <p className="text-sm text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <img src={item.thumbnail} alt={item.title} className="w-[54px] h-[54px] object-cover rounded-sm" />
                                    <div>
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium">${item.subtotal.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-3 px-4 py-4 bg-secondary rounded-sm">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

const PaymentOptions: React.FC = () => {
    const [selected, setSelected] = useState("cod");

    return (
        <div className="pl-5 lg:pl-0 space-y-3">
            <label className="flex items-center justify-between space-x-2">

                <div className="flex items-center gap-4">

                <input
                    type="radio"
                    name="payment"
                    checked={selected === "bank"}
                    onChange={() => setSelected("bank")}
                />
                <span>Bank</span>
                </div>
                <img
                    src="payments.png"
                    alt="Payments"
                    className="h-full ml-2"
                />
            </label>

            <label className="flex items-center space-x-4">
                <input
                    type="radio"
                    name="payment"
                    checked={selected === "cod"}
                    onChange={() => setSelected("cod")}
                />
                <span>Cash on delivery</span>
            </label>
        </div>
    );
};

const CouponSection: React.FC = () => {
    return (
        <div className=" pl-5 lg:pl-0 flex items-center h-14 mb-8 gap-3 mt-8">
            <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 border py-4 px-6 h-full rounded-sm"
            />
            <button
                type="button"
                className="bg-button2 hover:bg-red-600 transition-all duration-300 text-white font-medium font-poppins px-6 py-4 rounded-sm"
            >
                Apply Coupon
            </button>
        </div>
    );
};