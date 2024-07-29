"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholder";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Rev up your appetite and explore our fast food galaxy!",
    "Searching for speedy satisfaction? ",
    "Craving quick bites? Type away and let the fast food feast begin!",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[40rem] w-full  flex flex-col justify-center  items-center px-2">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
