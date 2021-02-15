class PhrasesController < ApplicationController
    
    # skip_before_action :phrase_params, only: [:index, :show, :create]

    def create
        parsedPhrase = Sentiment.call(params[:phrase])
        # Phrase.new(words: "I feel good", score: 0.25, result: "Positive")
        newPhrase = Phrase.new(user_id: params[:user_id], words: params[:phrase], score: Sentiment.call(params[:phrase])[:total], result: Sentiment.call(params[:phrase])[:type])
        
        if newPhrase.save
            puts "saving phrase!"
            render json: newPhrase, status: :created
        elsif
            puts "good try, fix a few things and try again"
            render json: newPhrase.errors, status: :unprocessable_entity
        end
        #----------- take data from parsedPhrase to create Phrase Object ----------
        # @phrase = Phrase.new(params)
        
        # Phrase.new(words: ___, score: _____, result: _____)
        
    end
    
    
    def index
        @phrases = Phrase.all
    end

    def show
        @phrase = Phrase.find(params[:id])
    end

    private

    # def phrase_params
    #     params.require(:phrase).permit()
    # end

end