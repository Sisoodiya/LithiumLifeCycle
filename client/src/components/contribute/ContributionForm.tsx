import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(2, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  organization: z.string().min(2, "Organization name is required"),
  orgType: z.string().min(1, "Organization type is required"),
  contactName: z.string().min(2, "Contact person name is required"),
  contactEmail: z.string().email("Invalid email address")
});

type FormValues = z.infer<typeof formSchema>;

const ContributionForm = () => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      organization: "",
      orgType: "",
      contactName: "",
      contactEmail: ""
    }
  });

  const submitIdeaMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/ideas", {
        ...data,
        tags: [] // Add tags if needed
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Contribution Submitted",
        description: "Thank you for your contribution! Your idea has been submitted successfully.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/ideas"] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your contribution. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: FormValues) => {
    submitIdeaMutation.mutate(data);
  };

  return (
    <Card className="bg-gray-50 overflow-hidden">
      <CardContent className="px-6 py-8">
        <h3 className="text-xl font-medium text-gray-900 mb-6">How Would You Like to Contribute?</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="orgType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Non-profit Organization">Non-profit Organization</SelectItem>
                      <SelectItem value="Educational Institution">Educational Institution</SelectItem>
                      <SelectItem value="Company">Company</SelectItem>
                      <SelectItem value="Government Agency">Government Agency</SelectItem>
                      <SelectItem value="Community Group">Community Group</SelectItem>
                      <SelectItem value="Individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project/Idea Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe how you'd like to contribute</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-secondary-600 hover:bg-secondary-700"
                disabled={submitIdeaMutation.isPending}
              >
                {submitIdeaMutation.isPending ? "Submitting..." : "Submit Contribution"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContributionForm;
