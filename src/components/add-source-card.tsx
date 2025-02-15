"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dumbbell, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { postDocument } from "@/services/sources";
import { toast } from "@/hooks/use-toast";

const urlSchema = z.object({
  url: z
    .string()
    .url({ message: "Please enter a valid URL. (e.g., https://example.com)" }),
});

type URLSourceFormData = z.infer<typeof urlSchema>;

export function AddSourceCard({ agentId }: { agentId: string }) {
  const form = useForm<URLSourceFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: "" },
  });

  const mutation = useMutation({
    mutationFn: (data: URLSourceFormData) =>
      postDocument({
        ...data,
        agentId,
      }),
    onSuccess: () => {
      form.reset();
      toast({
        variant: "success",
        title: "Source added successfully!",
      });
    },
    onError: () => {
      console.error("Failed to add source");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    },
  });

  return (
    <Card className="w-full max-w-md bg-blue-50/80">
      <CardHeader>
        <CardTitle className="flex gap-4 justify-center items-center">
          <Dumbbell className="h-4 w-4" />
          <p>Add Source</p>
        </CardTitle>
        <CardDescription className="text-center">Upload a source by providing a URL.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter a URL (e.g., https://example.com)"
                      {...field}
                      disabled={mutation.isPending}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                  URL...
                </>
              ) : (
                "Add URL Source"
              )}
            </Button>
          </form>
        </Form>

        {mutation.isError && (
          <Alert variant="destructive">
            <AlertDescription>{mutation.error?.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
