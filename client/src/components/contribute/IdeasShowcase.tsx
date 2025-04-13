import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Idea {
  id: number;
  title: string;
  description: string;
  organization: string;
  orgType: string;
  contactName: string;
  contactEmail: string;
  tags: string[];
  votes: number;
  createdAt: string;
}

const IdeasShowcase = () => {
  const { toast } = useToast();
  
  const { data: ideas, isLoading } = useQuery<Idea[]>({
    queryKey: ["/api/ideas"],
  });

  const voteMutation = useMutation({
    mutationFn: async (ideaId: number) => {
      const response = await apiRequest("POST", `/api/ideas/${ideaId}/vote`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ideas"] });
      toast({
        title: "Vote Recorded",
        description: "Thank you for supporting this idea!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to record your vote. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleVote = (ideaId: number) => {
    voteMutation.mutate(ideaId);
  };

  return (
    <Card className="bg-gray-50 overflow-hidden">
      <CardContent className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-900">Community Ideas</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                      <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : ideas && ideas.length > 0 ? (
            ideas.map(idea => (
              <div key={idea.id} className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <Lightbulb className="text-accent-600 h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{idea.title}</h4>
                    <p className="text-sm text-gray-500">Submitted by: {idea.organization}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {idea.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {idea.tags && idea.tags.map((tag, index) => (
                      <span key={index} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                    {!idea.tags || idea.tags.length === 0 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Sustainability
                      </span>
                    )}
                  </div>
                  <Button 
                    variant="ghost"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    onClick={() => handleVote(idea.id)}
                    disabled={voteMutation.isPending}
                  >
                    Support this idea ({idea.votes})
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
              <Lightbulb className="mx-auto text-gray-400 h-12 w-12 mb-3" />
              <p className="text-gray-700 font-medium">No ideas submitted yet</p>
              <p className="text-gray-500 mt-1">Be the first to share your innovative idea!</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
            View all community ideas <svg className="inline-block ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to determine tag color
const getTagColor = (tag: string) => {
  const tagMap: Record<string, string> = {
    "Energy": "bg-green-100 text-green-800",
    "Rural": "bg-blue-100 text-blue-800",
    "Education": "bg-purple-100 text-purple-800",
    "Youth": "bg-yellow-100 text-yellow-800",
    "Emergency": "bg-red-100 text-red-800",
    "Community": "bg-blue-100 text-blue-800",
    "Sustainability": "bg-green-100 text-green-800"
  };

  return tagMap[tag] || "bg-gray-100 text-gray-800";
};

export default IdeasShowcase;
