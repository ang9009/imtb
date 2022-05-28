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
import { LatLng } from "leaflet";

import { AiOutlineSmile } from "react-icons/ai";
import { FaToiletPaper } from "react-icons/fa";
import { GiNoseSide } from "react-icons/gi";
import { MdCleaningServices } from "react-icons/md";
import MapProps from "../../types/MapProps.interface";

const Map = dynamic<MapProps>(() => import("../../components/ui/Map"), {
  ssr: false,
});

interface FormInput {
  name: string;
  gender: string;
  review: string;
  coordinates: LatLng;
  image: { url: string; file: File };
  smellRating: number;
  cleanlinessRating: number;
  equippedRating: number;
  comfortRating: number;
}

const AddToiletPage = () => {
  const [gender, setGender] = useState<Option>(null);
  const [image, setImage] = useState<{ url: string; file: File }>(null);

  const { handleSubmit, register, control } = useForm();

  const addToilet = (input: FormInput) => {
    console.log(input);
  };

  return (
    <>
      <form onSubmit={handleSubmit(addToilet)} className="page-container">
        <h1>Add toilet</h1>

        <p className="field-heading">Toilet name</p>
        <PrimaryTextInput
          register={register}
          placeholder={"E.g. “Elements Mall Toilet”"}
          name={"name"}
        />

        <p className="field-heading">Gender</p>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              options={genderOptions}
              placeholder={"Select gender"}
              value={genderOptions.find((o) => o.value === value)}
              onChange={(e) => onChange(e.value)}
              isSearchable={false}
              styles={reactSelectStyles}
            />
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
          name={"image"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageDropzone value={value} onChange={onChange} />
          )}
        />

        <p className="field-heading">Review (optional)</p>
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

        <PrimaryTextArea
          name={"review"}
          placeholder={"Leave your thoughts here..."}
          height={250}
          register={register}
        />

        <PrimaryButton text={"Submit"} mt={"30px"} buttonType={"submit"} />
      </form>

      <style jsx>{`
        .rating-container {
          display: flex;
          align-items: center;
        }

        h1 {
          margin-top: 40px;
        }
      `}</style>
    </>
  );
};

export default AddToiletPage;
