import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin cannot be deleted");

  return;
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imgName = `${Math.random()}-${hasImagePath ? cabin.image : cabin.image.name.replaceAll("/", "")}`;
  const imgUrl = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;
  // we wanted to get the url of the image that navigates to the supabase backet so we've done the above..

  // 1- Create/Edit cabin
  let query = supabase.from("cabins");
  // A) Create
  if (!id) query = query.insert([{ ...cabin, image: imgUrl }]);

  // B) Update
  if (id) query = query.update({ ...cabin, image: imgUrl }).eq("id", id);

  const { data, error } = await query.select();

  if (error) throw new Error("Can't create this cabin");

  // 2- Upload image to supabase backet
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, cabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("cabin image couldn't be uploaded");
  }

  return data;
}
