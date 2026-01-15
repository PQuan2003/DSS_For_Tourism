import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export function LoginForm({
  className,
  ...props
}) {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleUserNameChange = (email) => {
    setUserName(email)
  }

  const handleSetPassword = (pw) => {
    setPassword(pw)
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("running login")
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, // backend expects `username`
          password,
        }),
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      localStorage.setItem("token", data.token);

      console.log("Login success:", data);

      // 👉 optional: redirect
      // window.location.href = "/dashboard";
      navigate("/")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    } 
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">User name</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="your_username"
                  required
                  onChange={(e) => handleUserNameChange(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" required onChange={(e) => handleSetPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" onClick={(e) => handleSubmitForm(e)}>
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="underline underline-offset-4 cursor-pointer text-primary"
              >
                Sign up
              </span>
            </div>

            <div className="mt-4 text-center text-sm">
              Go back?{" "}
              <span
                onClick={() => navigate("/")}
                className="underline underline-offset-4 cursor-pointer text-primary"
              >
                Homepage
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
