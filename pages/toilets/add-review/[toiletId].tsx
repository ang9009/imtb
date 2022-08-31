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
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        smellRating: yup.number().required(),
        cleanlinessRating: yup.number().required(),
        equippedRating: yup.number().required(),
        comfortRating: yup.number().required(),
        review: yup
          .string()
          .test("isNumber", "Toilet cannot be only numbers", (name) =>
            isNaN(parseInt(name))
          )
          .required(),
      })
    ),
    mode: "onSubmit",
  });
  const { mutate, isLoading, isError, error } = useMutation(
    async (input: FormInput) => {
      const avgRating = Math.round(
        (input.cleanlinessRating + //User's ratings
          input.comfortRating +
          input.smellRating +
          input.equippedRating) /
          4
      );

      if (!avgRating) {
        toast(
          "Missing rating input. Please fill out all fields and try again."
        );
        return;
      }

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
          <p className="error-message">{errors.smellRating?.message}</p>
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
          <p className="error-message">{errors.cleanlinessRating?.message}</p>
        </div>
        <div className="rating-container">
          <FaToiletPaper />
          <p>Amenities</p>
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
          <p className="error-message">{errors.equippedRating?.message}</p>
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
          <p className="error-message">{errors.comfortRating?.message}</p>
        </div>

        <h1 className="secondary-heading">Message</h1>
        <PrimaryTextArea
          name={"review"}
          placeholder={"Leave your thoughts here..."}
          height={250}
          register={register}
          error={errors.review}
          required={false}
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
