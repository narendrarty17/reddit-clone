export default function ModalButtons({ next, back, isNextActive, btnNames }) {
  return (
    <form
      className="flex justify-start md:justify-end gap-2"
      method="dialog"
      onSubmit={next}
    >
      <button
        className="text-white px-4 py-2 bg-darkMidGray hover:bg-midGray rounded-3xl"
        type="button"
        onClick={back}
      >
        {btnNames[0]}
      </button>
      <button
        className={`px-4 py-2 bg-darkMidGray
              ${
                isNextActive
                  ? " text-white hover:bg-midGray"
                  : " text-lightGray"
              }
              rounded-3xl`}
        type="submit"
        disabled={!isNextActive}
      >
        {btnNames[1]}
      </button>
      )
    </form>
  );
}
