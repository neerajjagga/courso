
const NewCourseBasicForm = ({ formData, setFormData }) => {
    return (
        <form className="flex flex-col gap-5">
            <div className="relative flex flex-col gap-2">
                <label className="text-xl text-gray-300">
                    Title:
                </label>
                <input
                    value={formData.title}
                    onChange={(e) => {
                        if (e.target.value.length <= 80) {
                            setFormData({ ...formData, title: e.target.value })
                        }
                    }}
                    type="text"
                    className="w-full input-instructor-primary px-4 py-2 pr-10" placeholder="eg. Cohort 3.0 - Web Development Program"
                    required
                />
                <span className="absolute right-3 top-10 text-lg">
                    {80 - formData.title.length}
                </span>
            </div>

            <div className="relative flex flex-col gap-2">
                <label className="text-xl text-gray-300">
                    Subtitle:
                </label>
                <input
                    value={formData.subtitle}
                    onChange={(e) => {
                        if (e.target.value.length <= 200) {
                            setFormData({ ...formData, subtitle: e.target.value })
                        }
                    }}
                    type="text"
                    className="w-full input-instructor-primary px-4 py-2 pr-10" placeholder="eg. Cohort 3.0 - Web Development Program"
                />
                <span className="absolute right-3 top-10 text-lg">
                    {200 - formData.subtitle.length}
                </span>
            </div>

            <div className="relative flex flex-col gap-2">
                <label className="text-xl text-gray-300">
                    Description:
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => {
                        if (e.target.value.length <= 3000) {
                            setFormData({ ...formData, description: e.target.value })
                        }
                    }}
                    className="w-full input-instructor-primary px-4 py-2 pr-16" placeholder="eg. Cohort 3.0 - Web Development Program"
                    rows={15}
                />
                <span className="absolute right-6 top-10 text-lg">
                    {3000 - formData.description.length}
                </span>
            </div>
        </form>
    )
}

export default NewCourseBasicForm