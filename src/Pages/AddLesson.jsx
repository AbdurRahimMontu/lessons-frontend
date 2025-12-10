import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import LottieAnimation from "../Components/LottieAnimation";
import { toast } from "react-toastify";


const AddLesson = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const { user } = useAuth(); // LOGGED-IN USER
  const axiosSecure = useAxiosSecure();

  const isPremiumUser = false;

  const { register, handleSubmit, reset } = useForm();

  // -----------------------------
  // CREATE LESSON FUNCTION
  // -----------------------------
  const handleCreateAddProduct = (data) => {
    // Attach user email
    data.email = user?.email;
    data.creatorName = user?.displayName;
    data.creatorPhoto = user?.photoURL;
    data.readingTime= user?.readingTime;


    axiosSecure
      .post("/allLessons", data)
      .then((res) => {
        console.log(res.data);
         toast.success("Add Lesson Successfully")
  
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>


      <div className="flex justify-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            onSubmit={handleSubmit(handleCreateAddProduct)}
            className="card-body"
          >
            <h2 className="text-xl font-bold text-center pt-2">
              Add New Lesson
            </h2>

            <fieldset className="fieldset">
              {/* Title */}
              <label className="label">Title</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="input  w-full"
                placeholder="Lesson Title"
              />

              {/* Full Description */}
              <label className="label">Description</label>
              <textarea
                {...register("description", { required: true })}
                className="textarea  w-full textarea-bordered"
                placeholder="Full Description / Story / Insight"
              ></textarea>

              {/* Category */}
              <label className="label">Category</label>
              <select
                {...register("category", { required: true })}
                className="select  w-full select-bordered"
              >
                <option value="">Pick a Category</option>
                <option>Personal Growth</option>
                <option>Career</option>
                <option>Relationships</option>
                <option>Mindset</option>
                <option>Mistakes Learned</option>
              </select>

              {/* Emotional Tone */}
              <label className="label">Emotional Tone</label>
              <select
                {...register("emotionalTone", { required: true })}
                className="select  w-full select-bordered"
              >
                <option value="">Pick a Tone</option>
                <option>Motivational</option>
                <option>Sad</option>
                <option>Realization</option>
                <option>Gratitude</option>
              </select>

              {/* Privacy */}
              <label className="label">Privacy</label>
              <select
                {...register("privacy", { required: true })}
                className="select  w-full select-bordered"
              >
                <option value="">Privacy</option>
                <option>Public</option>
                <option>Private</option>
              </select>

              {/* Access Level */}
              <label className="label">Access Level</label>
              <div
                className={!isPremiumUser ? "tooltip tooltip-right" : ""}
                data-tip={
                  !isPremiumUser
                    ? "Upgrade to Premium to create paid lessons"
                    : ""
                }
              >
                <select
                  disabled={!isPremiumUser}
                  className="select  w-full select-bordered"
                  {...register("accessLevel")}
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              {/* saved */}
              <input type="number" {...register("saved")} className="input w-full" placeholder="Saved Count" />
            

      <div className="w-full border">
  <button className="btn btn-primary w-full" onClick={() => setShowAnimation(true)}>
  Add Lesson
  </button>

  {showAnimation && <LottieAnimation onClose={() => setShowAnimation(false)} />}
</div>

               
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;

