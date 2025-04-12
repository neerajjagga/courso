import { useFetchSingleCourse } from '../../hooks/useFetchSingleCourse';
import { useParams } from 'react-router-dom';

const SingleCourse = () => {
    const { titleSlug } = useParams();
    const { data: course, isPending } = useFetchSingleCourse(titleSlug);
    console.log(course);

    return (
        <div>SingleCourse</div>
    )
}

export default SingleCourse