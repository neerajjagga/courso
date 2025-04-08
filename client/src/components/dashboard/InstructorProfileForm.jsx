import { useState } from "react";

const InstructorProfileForm = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        isEmailVerified: ""
    });

    return (
        <div>InstructorProfileForm</div>
    )
}

export default InstructorProfileForm