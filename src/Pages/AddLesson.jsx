import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "./../Shared/Navbar";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth"; // <-- Make sure this exists

const AddLesson = () => {
  const { user } = useAuth(); // LOGGED-IN USER
  const axiosSecure = useAxiosSecure();

  const isPremiumUser = true;

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

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your lesson has been created",
            showConfirmButton: false,
            timer: 1500,
          });

          reset();
        }
      })
      .catch((error) => {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Unable to create lesson.",
        });
      });
  };

  return (
    <div>


      <div className="flex justify-center border">
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
                className="input"
                placeholder="Lesson Title"
              />

              {/* Full Description */}
              <label className="label">Description</label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered"
                placeholder="Full Description / Story / Insight"
              ></textarea>

              {/* Category */}
              <label className="label">Category</label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
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
                className="select select-bordered"
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
                className="select select-bordered"
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
                  className="select select-bordered"
                  {...register("accessLevel")}
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              {/* saved */}
              <input type="number" {...register("saved")} className="input" placeholder="Saved Count" />
            

              <button className="btn btn-neutral mt-2">Add Lesson</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;

