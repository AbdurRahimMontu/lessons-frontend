import React from 'react';
import { useParams } from 'react-router';

const UpdateLesson = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <div>
            Update Lesson: Page
        </div>
    );
};

export default UpdateLesson;
