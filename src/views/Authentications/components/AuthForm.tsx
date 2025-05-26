"use client";

import { AuthMode } from '@/types/auth';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInData, signInSchema, SignUpData, signUpSchema } from '../lib/validation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormFieldRenderProps from '@/components/common/FormFieldRenderProps';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { useSignInMutation } from '@/services/request/auth/signIn';
import { useSignUpMutation } from '@/services/request/auth/signUp';

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const form = useForm<SignInData | SignUpData>({
    resolver: zodResolver(mode === "signin" ? signInSchema : signUpSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const { mutate: signInMutation } = useSignInMutation();
  const { mutate: signUpMutation } = useSignUpMutation();

  const onSubmit = async (data: SignInData | SignUpData) => {
    try {
      if (mode === "signin") {
        signInMutation(data as SignInData, {
        onSuccess: () => {
          toast.success("Welcome to Nexus")
          form?.reset();
        }
      });
      } else {
        signUpMutation(data as SignUpData, {
          onSuccess: () => {
            toast.success("Account successfully created on Nexus");
            form?.reset();
            setMode("signup");
          }
        });
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Authentication failed");
    }
  };

  if (!hydrated) return null;

  return (
    <Card className="w-full max-w-md bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-web3-accent to-web3-accent2 bg-clip-text text-transparent">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-zinc-400">
          {mode === "signin"
            ? "Enter your credentials to access your account"
            : "Enter your information to create an account"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form {...form}>
          <CardContent className="space-y-4">
            {mode === "signup" && (
              <>
                <FormFieldRenderProps
                  control={control}
                  name="first_name"
                  label="First name"
                  render={({ field: { onChange, ...restField } }) => (
                    <Input
                      placeholder="Enter your first name"
                      className="glass-input"
                      {...restField}
                      value={restField.value ?? ''}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  )}
                />

                <FormFieldRenderProps
                  control={control}
                  name="last_name"
                  label="Last name"
                  render={({ field: { onChange, ...restField } }) => (
                    <Input
                      placeholder="Enter your last name"
                      className="glass-input"
                      {...restField}
                      value={restField.value ?? ''}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  )}
                />
                <FormFieldRenderProps
                  control={control}
                  name="location"
                  label="Location"
                  render={({ field: { onChange, ...restField } }) => (
                    <Input
                      placeholder="Enter your location"
                      className="glass-input"
                      {...restField}
                      value={restField.value ?? ''}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </>
            )}
            <FormFieldRenderProps
              control={control}
              name="email"
              label="Email"
              render={({ field: { onChange, ...restField } }) => (
                <Input
                  placeholder="Enter your email address"
                  className="glass-input"
                  type="email"
                  {...restField}
                  value={restField.value ?? ''}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                />
              )}
            />
            <FormFieldRenderProps
              control={control}
              name="password"
              label="Password"
              render={({ field: { onChange, ...restField } }) => (
                <Input
                  placeholder="Create a password"
                  className="glass-input"
                  type="password"
                  {...restField}
                  value={restField.value ?? ''}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                />
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full mt-4 bg-gradient-to-r from-web3-accent to-web3-accent2 hover:opacity-90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <span className="animate-pulse mr-2">●</span>
                  <span>Processing...</span>
                </div>
              ) : mode === "signin" ? "Sign In" : "Sign Up"}
            </Button>
            <div className="text-sm text-center text-zinc-400">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <Button
                type="button"
                className="underline mt-4 text-web3-accent hover:text-web3-accent2 transition-colors"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" ? "Sign Up" : "Sign In"}
              </Button>
            </div>
          </CardFooter>
          </Form>
      </form>
    </Card>
  )
}

export default AuthForm