import React from "react";
import { InstructorSettingsProfileForm } from "types/user";

interface PropType {
    instructorFormData: InstructorSettingsProfileForm;
    setInstructorFormData: React.Dispatch<React.SetStateAction<InstructorSettingsProfileForm>>;
    isEditView: boolean;
}

const InstructorProfileForm = ({ instructorFormData, setInstructorFormData, isEditView }: PropType) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="fullname">Full Name</label>
                <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    className={`${isEditView ? "input-primary" : "input-primary-disabled"} lg:w-1/2`}
                    placeholder="Your full name"
                    value={instructorFormData.fullname}
                    onChange={(e) =>
                        setInstructorFormData({ ...instructorFormData, fullname: e.target.value })
                    }
                    disabled={!isEditView}
                    maxLength={20}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="bio">Bio / Headline</label>
                <textarea
                    id="bio"
                    name="bio"
                    className={`${isEditView ? "input-primary" : "input-primary-disabled"} lg:w-2/3 h-24 resize-none`}
                    placeholder="Write a short bio (max 60 chars)"
                    value={(instructorFormData.bio ?? "")}
                    onChange={(e) =>
                        setInstructorFormData({ ...instructorFormData, bio: e.target.value })
                    }
                    maxLength={60}
                    disabled={!isEditView}
                />
            </div>

            <div className="mt-6">
                <h2 className="text-2xl">Social Links</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="twitterUsername">Twitter Username</label>
                    <input
                        id="twitterUsername"
                        type="text"
                        className={`${isEditView ? "input-primary" : "input-primary-disabled"}`}
                        placeholder="e.g., johndoe"
                        value={(instructorFormData.twitterUsername ?? "")}
                        onChange={(e) =>
                            setInstructorFormData({ ...instructorFormData, twitterUsername: e.target.value })
                        }
                        disabled={!isEditView}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="facebookUsername">Facebook Username</label>
                    <input
                        id="facebookUsername"
                        type="text"
                        className={`${isEditView ? "input-primary" : "input-primary-disabled"}`}
                        placeholder="e.g., johndoe"
                        value={(instructorFormData.facebookUsername ?? "")}
                        onChange={(e) =>
                            setInstructorFormData({ ...instructorFormData, facebookUsername: e.target.value })
                        }
                        disabled={!isEditView}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="instagramUsername">Instagram Username</label>
                    <input
                        id="instagramUsername"
                        type="text"
                        className={`${isEditView ? "input-primary" : "input-primary-disabled"}`}
                        placeholder="e.g., johndoe"
                        value={(instructorFormData.instagramUsername ?? "")}
                        onChange={(e) =>
                            setInstructorFormData({ ...instructorFormData, instagramUsername: e.target.value })
                        }
                        disabled={!isEditView}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="linkedInUsername">LinkedIn Username</label>
                    <input
                        id="linkedInUsername"
                        type="text"
                        className={`${isEditView ? "input-primary" : "input-primary-disabled"}`}
                        placeholder="e.g., johndoe"
                        value={(instructorFormData.linkedInUsername ?? "")}
                        onChange={(e) =>
                            setInstructorFormData({ ...instructorFormData, linkedInUsername: e.target.value })
                        }
                        disabled={!isEditView}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="githubUsername">GitHub Username</label>
                    <input
                        id="githubUsername"
                        type="text"
                        className={`${isEditView ? "input-primary" : "input-primary-disabled"}`}
                        placeholder="e.g., johndoe"
                        value={(instructorFormData.githubUsername ?? "")}
                        onChange={(e) =>
                            setInstructorFormData({ ...instructorFormData, githubUsername: e.target.value })
                        }
                        disabled={!isEditView}
                    />
                </div>
            </div>
        </div>
    )
}

export default InstructorProfileForm