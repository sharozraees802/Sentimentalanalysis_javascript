require 'json'

module Sentiment
    class << self
        def call(text)
            sentiment = analyze(text, total = 0)
            sentiment[:type] = sentiment_type(sentiment[:total])

            sentiment
        end

        def phrase(text)
            return text 
        end

        def analyze(text, total)
            total = 0
            result = Array.new
            word_bank = load_file("words.json")

            words = clean(text).split

            bigrams(text).each_with_index do |bigram, index|
                score = word_bank[bigram].to_f

                next unless score && score != 0.0

                total += score
                result << { key: bigram, score: score }

                2.times { words.delete_at(index) }
            end

            words.each do |word|
                score = word_bank[word].to_f
                
                total += score
                result << { key: word, score: score }
            end

            {results: result, total: total}
        end

        def sentiment_type(total)
            case
            when total < 0
                'Negative'
            when total == 0
                'Neutral'
            when total > 0
                'Positive'
            end
        end

        def load_file(file_name)
            JSON.parse(File.read("#{Dir.pwd}/#{file_name}"))
        end 

        def bigrams(text)
            bigram = text.split.each_cons(2).to_a
            bigram.map{ |i| i.join(' ')}
        end

        def clean(text)
            replacements = %w(. , % ! ? ( ) [ ]).map { |r| text.gsub!(r, '') }

            text.downcase
        end
    end
end

# puts "enter text:"
# text = gets.chomp
# puts Sentiment.call(text)