class CreatePhrases < ActiveRecord::Migration[5.2]
  def change
    create_table :phrases do |t|
      t.integer :user_id
      t.string :words
      t.float :score
      t.string :result
      t.timestamps
    end
  end
end
