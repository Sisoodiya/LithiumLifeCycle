import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { BatteryPricing } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  type: z.enum(["ev_standard", "ev_premium", "hybrid", "energy_storage", "other"], {
    required_error: "Please select a battery type",
  }),
  model: z.string().min(1, "Model is required"),
  age: z.coerce.number().min(0, "Age must be a positive number"),
  capacity: z.coerce.number().min(0, "Capacity must be a positive number"),
  condition: z.enum(["excellent", "good", "fair", "poor", "damaged"], {
    required_error: "Please select a battery condition",
  }),
});

type BatteryPricingFormProps = {
  onCalculatePrice: (batteryDetails: BatteryPricing, estimate: any) => void;
  isCalculating: boolean;
  setIsCalculating: (isCalculating: boolean) => void;
};

const BatteryPricingForm = ({ onCalculatePrice, isCalculating, setIsCalculating }: BatteryPricingFormProps) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<BatteryPricing>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: undefined,
      model: "",
      age: undefined,
      capacity: undefined,
      condition: undefined,
    },
  });

  const batteryPriceMutation = useMutation({
    mutationFn: async (data: BatteryPricing) => {
      const response = await apiRequest("POST", "/api/battery/price", data);
      return response.json();
    },
    onSuccess: (data, variables) => {
      onCalculatePrice(variables, data);
      setHasSubmitted(true);
      setIsCalculating(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to calculate battery price. Please try again.",
        variant: "destructive",
      });
      setIsCalculating(false);
    },
  });

  const onSubmit = (data: BatteryPricing) => {
    setIsCalculating(true);
    batteryPriceMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select battery type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ev_standard">EV Standard Battery</SelectItem>
                  <SelectItem value="ev_premium">EV Premium Battery</SelectItem>
                  <SelectItem value="hybrid">Hybrid Vehicle Battery</SelectItem>
                  <SelectItem value="energy_storage">Energy Storage Battery</SelectItem>
                  <SelectItem value="other">Other Li-ion Battery</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery Model/Make</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Tesla Model 3, Nissan Leaf"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery Age (years)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="20"
                  placeholder="e.g., 3"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery Capacity (kWh)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  placeholder="e.g., 75"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="excellent">Excellent (80-100% capacity)</SelectItem>
                  <SelectItem value="good">Good (60-80% capacity)</SelectItem>
                  <SelectItem value="fair">Fair (40-60% capacity)</SelectItem>
                  <SelectItem value="poor">Poor (Below 40% capacity)</SelectItem>
                  <SelectItem value="damaged">Damaged/Not Working</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isCalculating}
          >
            {isCalculating ? "Calculating..." : hasSubmitted ? "Update Estimate" : "Get Price Estimate"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BatteryPricingForm;
