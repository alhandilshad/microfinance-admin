export default function BillingDetails({ formData, setFormData, errors }) {
  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <h1 className="border-b p-1">Billing Detail</h1>
      <div className="flex gap-5 mt-5 w-full">
        <div className="w-full">
          <label className="block w-full">First Name *</label>
          <input type="text" className="p-2 rounded-md border w-full block"  name="firstName"  value={formData.firstName} onChange={handleChange}/>
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName}</span>
          )}
        </div>
        <div className="w-full">
          <label className="block w-full">Last Name *</label>
          <input type="text" className="p-2 rounded-md border w-full block"   name="lastName" value={formData.lastName} onChange={handleChange}/>
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName}</span>
          )}
        </div>
      </div>
      <div className="mt-5 w-full">
        <label className="block w-full">Company name (optional) *</label>
        <input type="text" className="p-2 rounded-md border w-full block" value={formData.companyName} name="companyName" onChange={handleChange} />
      </div>
      <div className="mt-5 w-full">
        <label className="block w-full">Country / Region *</label>
        <input type="text" placeholder="United Arab Emirates" 
        className="p-2 rounded-md border block w-full" value={formData.country} name="country" onChange={handleChange}/>
        {errors.country && (
          <span className="text-red-500 text-sm">{errors.country}</span>
        )}
      </div>
      <div className="mt-5 w-full">
        <label className="block w-full">Street address *</label>
        <div>
          <input type="text"
            placeholder="Apartment, suite, unit, etc.(optional)" name="streetAddress" className="p-2 rounded-md border block w-full" 
            value={formData.streetAddress} onChange={handleChange}/>
            {errors.streetAddress && (
              <span className="text-red-500 text-sm">{errors.streetAddress}</span>
            )}
        </div>
        {/* <div>
          <input type="text" placeholder="House number and street name" className="p-2 rounded-md border block mt-5 w-full"  
          value={formData.address} onChange={handleChange} name="address"/>
        </div> */}
      </div>
      <div className="mt-5 w-full">
        <label className="block w-full">Town / City *</label>
        <input type="text" className="p-2 rounded-md border w-full block" name="city" value={formData.city} onChange={handleChange}/>
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city}</span>
        )}
      </div>
      {/* <div className="mt-5 w-full">
        <label className="block w-full">State / County (optional) *</label>
        <input type="text" className="p-2 rounded-md border w-full block" name="state" value={formData.state} onChange={handleChange}/>
      </div> */}
      <div className="mt-5 w-full">
        <label className="block w-full">Phone *</label>
        <input type="text" className="p-2 rounded-md border w-full block" name="phone" value={formData.phone} onChange={handleChange}/>
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone}</span>
        )}
      </div>
      <div className="mt-5 w-full">
        <label>Email *</label>
        <input type="email" className="p-2 rounded-md border w-full block" name="email" value={formData.email} onChange={handleChange}/>
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>

      <div className="mt-5 w-full">
        <label className="block w-full">Order notes (optional)</label>
        <textarea value={formData.orderNotes} onChange={handleChange} name="orderNotes" className="p-2 w-full rounded-md border block h-32" placeholder="Notes about your order, e.g. special notes for delivery." ></textarea>
        {/* {errors.orderNotes && (
          <span className="text-red-500 text-sm">{errors.orderNotes}</span>
        )} */}
      </div>
    </div>
  );
}
