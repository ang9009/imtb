import React from "react";
import Link from "next/link";
import Toilet from "../../types/toilet.interface";
import capitalise from "../../utils/capitalise";
import { useQuery } from "react-query";
import getToilets from "../../queries/getToilets";

const ToiletSection = () => {
  const {
    data: { data: toilets },
  } = useQuery("toilets", () => getToilets());

  return (
    <>
      <section>
        {toilets.map((toilet) => {
          return (
            <Link href={`/toilets/${toilet.id}`} key={toilet.id}>
              <div className="listing-card">
                <div className="image-container">
                  <img
                    src="/images/placeholder.jpg"
                    alt="Image not available"
                    className="listing-image"
                  />
                </div>
                <div className="listing-information">
                  <div>
                    <h1 className="listing-name">{capitalise(toilet.name)}</h1>
                    <div className="tag">{capitalise(toilet.gender)}</div>
                  </div>
                  <div className="rating">3/10</div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <style jsx>{`
        section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 350px;
          grid-row-gap: 40px;
          grid-column-gap: 30px;
          width: 100%;
          margin-bottom: 160px;
        }

        .listing-card {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: pointer;
          transition: 0.2s all;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
            rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
        }

        .listing-name {
          white-space: nowrap;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tag {
          font-size: 9px;
          display: inline;
          padding: 2px 3px;
          font-weight: 800;
          color: #fff;
          background: #3f6ce1;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 245px;
        }

        .listing-information {
          padding: 15px;
          width: 100%;
          height: 30%;
          z-index: 3000;
          background: #fff;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      `}</style>
    </>
  );
};

export default ToiletSection;
