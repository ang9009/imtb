import React from "react";
import { useRouter } from "next/router";
import PrimaryTextArea from "../../../components/widgets/PrimaryTextArea";
import { GiNoseSide } from "react-icons/gi";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { MdCleaningServices } from "react-icons/md";
import { FaToiletPaper } from "react-icons/fa";
import { AiOutlineSmile } from "react-icons/ai";
import PrimaryButton from "../../../components/widgets/PrimaryButton";
import { useMutation } from "react-query";
import supabase from "../../../lib/supabase";

interface FormInput {
  smellRating: number;
  cleanlinessRating: number;
  equippedRating: number;
  comfortRating: number;
  review: string;
}

const AddReviewPage = () => {
  const router = useRouter();
  const user = supabase.auth.user();
  const toiletId = router.query.toiletId as string;

  const { handleSubmit, register, control } = useForm();

  const { mutate, isLoading, isError, error } = useMutation(
    async (input: FormInput) => {
      const avgRating = Math.round(
        (input.cleanlinessRating +
          input.comfortRating +
          input.smellRating +
          input.equippedRating) /
          4
      );

      const { data: review_data, error: review_error } = await supabase
        .from("reviews")
        .insert([
          {
            toilet_id: toiletId,
            message: input.review,
            rating: avgRating,
            user_id: user.id,
            user_name: user.user_metadata.name,
          },
        ]);
    },
    {
      onSuccess: () => {
        router.push(`/toilets/${toiletId}`);
      },
    }
  );

  return (
    <>
      <form
        className="page-container"
        onSubmit={handleSubmit((input: FormInput) => mutate(input))}
      >
        <h1 className="primary-heading">Review</h1>
        <div className="rating-container">
          <GiNoseSide />
          <p>Smell</p>
          <Controller
            control={control}
            name="smellRating"
            render={({ field: { onChange, value } }) => (
              <Rating
                ratingValue={value}
                onClick={(rating) => onChange(rating / 20)}
              />
            )}
          />
        </div>
        <div className="rating-container">
          <MdCleaningServices />
          <p>Cleanliness</p>
          <Controller
            control={control}
            name="cleanlinessRating"
            render={({ field: { onChange, value } }) => (
              <Rating
                ratingValue={value}
                onClick={(rating) => onChange(rating / 20)}
              />
            )}
          />
        </div>
        <div className="rating-container">
          <FaToiletPaper />
          <p>Equipped</p>
          <Controller
            control={control}
            name="equippedRating"
            render={({ field: { onChange, value } }) => (
              <Rating
                ratingValue={value}
                onClick={(rating) => onChange(rating / 20)}
              />
            )}
          />
        </div>
        <div className="rating-container">
          <AiOutlineSmile />
          <p>Comfort</p>
          <Controller
            control={control}
            name="comfortRating"
            render={({ field: { onChange, value } }) => (
              <Rating
                ratingValue={value}
                onClick={(rating) => onChange(rating / 20)}
              />
            )}
          />
        </div>

        <h1 className="secondary-heading">Message</h1>
        <PrimaryTextArea
          name={"review"}
          placeholder={"Leave your thoughts here..."}
          height={250}
          register={register}
        />

        <PrimaryButton
          text={"Submit"}
          mt={"20px"}
          buttonType={"submit"}
          disabled={isLoading}
        />
      </form>

      <style jsx>{`
        .rating-container {
          display: flex;
          align-items: center;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default AddReviewPage;
