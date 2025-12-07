import React from "react";
import { useForm } from "react-hook-form";
// import useAuth from './../Hooks/useAuth';
import Navbar from './../Shared/Navbar';

const AddLesson = () => {
//   const { user } = useAuth();
// const isPremiumUser = user?.isPremium;
const isPremiumUser =true;
// const isPremiumUser = false;
  const {
    register,
    handleSubmit,
   reset
  } = useForm();

  const handleSignup = (data) => {
    console.log(data);
     reset(); 
  };
  return (
    <div>
     <Navbar></Navbar>
      <div className="flex justify-center pt-5">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(handleSignup)} className="card-body">
             <h2 className="text-2xl font-bold text-center pt-4">Add New Lesson</h2>
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Title</label>
              <input
                type="text"
                {...register("title", { required: "Name is required" })}
                className="input"
                defaultValue="Lesson Title"
              />
                 {/* Name */}
              <label className="label">Description</label>
              <input
                type="text"
                {...register("description", { required: "Name is required" })}
                className="input"
                defaultValue="Full Description / Story / Insight"
              />
                 {/* Name */}
<label className="label">Category</label>
<select {...register("category", { required: "Name is required" })}  defaultValue="Pick a Category" className="select  ">
  <option disabled={true}>Pick a Category</option>
  <option>Personal Growth</option>
  <option>Career</option>
  <option>Relationships</option>
  <option>Mindset</option>
  <option>Mistakes Learned</option>
</select>
   {/* Name */}
<label className="label">Emotional Tone</label>
<select {...register("emotionalTone", { required: "Name is required" })} defaultValue="Pick a Emotional Tone" className="select ">
  <option disabled={true}>Pick a Emotional Tone</option>
  <option>Motivational</option>
  <option>Sad</option>
  <option>Realization</option>
  <option>Gratitude</option>

</select>
{/* Name */}
<label className="label">Privacy</label>
<select {...register("privacy", { required: "Name is required" })} defaultValue="Privacy" className="select ">
  <option disabled={true}>Privacy</option>
  <option>Public</option>
  <option>Private</option>
</select>
{/* Name */}
<label className="label">Access Level</label>
<div
  className={!isPremiumUser ? "tooltip tooltip-right" : ""}
  data-tip={!isPremiumUser ? "Upgrade to Premium to create paid lessons" : ""}
>
  <select
    disabled={!isPremiumUser}
    className="select select-bordered"
    {...register("accessLevel")}
  >
    <option value="free">Free</option>
    <option value="premium">Premium</option>
  </select>
</div>
{/* Name */}


              <button className="btn btn-neutral mt-4">Add Lesson</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
