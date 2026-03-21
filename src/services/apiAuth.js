import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (session.session === null) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signUp(user) {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        fullName: user.fullName,
        avatar: "",
      },
      emailRedirectTo: "/dashboard",
    },
  });

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  // 1. Update password or fullName
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${Math.random()}-${data.user.id}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update the avatar in user itself
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
