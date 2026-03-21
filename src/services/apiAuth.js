import supabase from "./supabase";

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
