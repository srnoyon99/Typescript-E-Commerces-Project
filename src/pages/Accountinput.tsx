import Button2 from '@/components/Button2'

const Accountinput = () => {
  return (
    <div>
      {/* Profile Edit Form */}
                          <div className="col-span-9 font-poppins bg-white shadow-contact rounded-sm py-10 px-20">
      
                              <div className="flex items-center justify-between ">
      
                              <div>
                              <h2 className="text-xl font-medium text-button2 mb-6">
                                  Edit Your Profile
                              </h2>
                              </div>
      
                              <div>
                                  <Button2 className="bg-button2 text-white hover:bg-button2-hover">
                                      Save Change
                                  </Button2>
                              </div>
      
                              </div>
      
                              <form className="grid grid-cols-2 gap-6">
                                  {/* First Name */}
                                  <div>
                                      <label className="block text-sm  mb-2">
                                          First Name <span className="text-red-500">*</span>
                                      </label>
                                      <input
                                          type="text"
                                          placeholder="First name"
                                          className="w-full bg-gray-100 h-[50px]  px-4 text-gray-600 outline-none"
                                      />
                                  </div>
      
                                  {/* Last Name */}
                                  <div>
                                      <label className="block text-sm  mb-2">
                                          Last Name <span className="text-red-500">*</span>
                                      </label>
                                      <input
                                          type="text"
                                          placeholder="Last name"
                                          className="w-full bg-gray-100 h-[50px]  px-4 text-gray-600 outline-none"
                                      />
                                  </div>
      
                                  {/* Email */}
                                  <div>
                                      <label className="block text-sm  mb-2">
                                          Email <span className="text-red-500">*</span>
                                      </label>
                                      <input
                                          type="email"
                                          placeholder="Your email"
                                          className="w-full bg-gray-100 h-[50px]  px-4 text-gray-600 outline-none"
                                      />
                                  </div>
      
                                  {/* Number Section */}
                                  <div>
                                      <label className="block text-sm  mb-2">
                                          Number <span className="text-red-500">*</span>
                                      </label>
                                      <input
                                          type="text"
                                          className="w-full bg-gray-100 h-[50px]  px-4 text-gray-600 outline-none"
                                          placeholder="Your Number"
                                      />
                                  </div>
                                  
                              </form>
      
                               {/* Address */}
                                  <div className="mt-6">
                                      <label className="block text-sm  mb-2">
                                          Address <span className="text-red-500">*</span>
                                      </label>
                                      <input
                                          type="text"
                                          className="w-full bg-gray-100 h-[50px]  px-4 text-gray-600 outline-none"
                                          placeholder="Your Address"
                                      />
                                  </div>
      
                                  <form className="grid grid-cols-2 gap-6 mt-6">
                                      {/* City */}
                                      <div>
                                          <label className="block text-sm  mb-2">
                                              City <span className="text-red-500">*</span>
                                          </label>
                                          <input
                                              type="text"
                                              placeholder="City"
                                              className="w-full bg-gray-100 h-[50px]  px-4 text-gray-600 outline-none"
                                          />
                                      </div>
      
                                      {/* Postal Code */}
                                      <div>
                                          <label className="block text-sm  mb-2">
                                              Postal Code <span className="text-red-500">*</span>
                                          </label>
                                          <input
                                              type="text"
                                              placeholder="Postal Code"
                                              className="w-full bg-gray-100 h-[50px]  px-4 text-gray-600 outline-none"
                                          />
                                      </div>
                                  </form>
      
      
      
                                  {/* Buttons */}
                                  <div className="col-span-2 flex justify-end gap-8 mt-6">
                                      <button
                                          type="button"
                                          className="text-gray-600 hover:text-black font-medium"
                                      >
                                          Cancel
                                      </button>
                                      <Button2 className="">Save Change</Button2>
                                  </div>
      
                          </div>
    </div>
  )
}

export default Accountinput
