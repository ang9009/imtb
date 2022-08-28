import PrimaryTextInput from "../../components/widgets/PrimaryTextInput";
import React, { Component, useState } from "react";
import Select from "react-select";
import { reactSelectStyles } from "../../data/reactSelectStyles";
import { genderOptions } from "../../data/data";
import { Option } from "../../data/data";
import dynamic from "next/dynamic";
import ImageDropzone from "../../components/widgets/ImageDropzone";
import PrimaryTextArea from "../../components/widgets/PrimaryTextArea";
import { Rating } from "react-simple-star-rating";
import PrimaryButton from "../../components/widgets/PrimaryButton";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { v4 as uuid } from "uuid";
import supabase from "../../lib/supabase";

import { AiOutlineSmile } from "react-icons/ai";
import { FaToiletPaper } from "react-icons/fa";
import { GiNoseSide } from "react-icons/gi";
import { MdCleaningServices } from "react-icons/md";
import MapProps from "../../types/mapProps.interface";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Map = dynamic<MapProps>(
  () => import("../../components/ui/CreateToiletMap"),
  {
    ssr: false,
  }
);

interface FormInput {
  name: string;
  gender: string;
  review: string;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
  imageFile: File;
  smellRating: number;
  cleanlinessRating: number;
  equippedRating: number;
  comfortRating: number;
}

const AddToiletPage = () => {
  const router = useRouter();
  const user = supabase.auth.user();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: { coordinates: { lat: 22.427509, lng: 114.205905 } },
    resolver: yupResolver(
      yup.object().shape({
        smellRating: yup.number().required(),
        cleanlinessRating: yup.number().required(),
        equippedRating: yup.number().required(),
        comfortRating: yup.number().required(),
        review: yup.string().required().min(40),
        gender: yup.string().required(),
        name: yup.string().required(),
        imageFile: yup.mixed().required(),
      })
    ),
    mode: "onSubmit",
  });

  //Submit useMutation
  const { mutate, isLoading, isError, error } = useMutation(
    async (input: FormInput) => {
      console.log("cum");
      const avgRating = Math.round(
        (input.cleanlinessRating +
          input.comfortRating +
          input.smellRating +
          input.equippedRating) /
          4
      );

      if (!avgRating || !input.gender) {
        toast.error(
          "Missing rating or gender input. Please fill out all fields and try again."
        );
        return;
      }

      const imageId = uuid();

      const { data: toilet_data, error: toilet_error } = await supabase
        .from("toilets")
        .insert([
          {
            gender: input.gender,
            name: input.name,
            lat: input.coordinates.lat,
            lng: input.coordinates.lng,
            image_url: imageId,
          },
        ])
        .single();

      if (toilet_error) {
        throw new Error(toilet_error.message);
      }

      const { data: image_data, error: image_error } = await supabase.storage
        .from("images")
        .upload(imageId, input.imageFile);

      if (image_error) throw new Error(image_error.message);

      const { data: review_data, error: review_error } = await supabase
        .from("reviews")
        .insert([
          {
            toilet_id: toilet_data.id,
            message: input.review,
            rating: avgRating,
            user_id: user.id,
            user_name: user.user_metadata.name,
          },
        ]);

      if (review_error) throw new Error(review_error.message);

      return toilet_data;
    },
    {
      onSuccess: (toilet_data) => {
        router.push(`/toilets/${toilet_data.id}`);
      },
      onError: () => {
        toast.error("Toilet has already been posted!");
      },
    }
  );

  // console.log(errors.image.file.type);

  return (
    <>
      <form
        onSubmit={handleSubmit((input: FormInput) => mutate(input))}
        className="page-container"
      >
        <h1 className="primary-heading">Add toilet</h1>

        <p className="field-heading">Toilet name</p>
        <PrimaryTextInput
          register={register}
          placeholder={"E.g. “Elements Mall Toilet”"}
          name={"name"}
        />
        <p className="error-message">{errors.name?.message}</p>

        <p className="field-heading">Gender</p>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Select
                options={genderOptions}
                placeholder={"Select gender"}
                value={genderOptions.find((o) => o.value === value)}
                onChange={(e) => onChange(e.value)}
                isSearchable={false}
                styles={reactSelectStyles}
              />
              <p className="error-message">{errors.gender?.message}</p>
            </>
          )}
          name={"gender"}
        />

        <p className="field-heading">Map</p>
        <Controller
          control={control}
          name={"coordinates"}
          render={({ field: { onChange, value } }) => (
            <Map onChange={onChange} value={value} />
          )}
        />

        <p className="field-heading">Toilet image</p>
        <Controller
          name={"imageFile"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <ImageDropzone value={value} onChange={onChange} />
              <p className="error-message">{errors.imageFile?.message}</p>
            </>
          )}
        />

        <p className="field-heading">Review</p>
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
        />
        <p className="error-message">{errors.review?.message}</p>

        <PrimaryButton
          disabled={isLoading}
          text={"Submit"}
          mt={"30px"}
          buttonType={"submit"}
        />
      </form>

      <style jsx>{`
        .rating-container {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default AddToiletPage;
