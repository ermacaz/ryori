class Image < ApplicationRecord
  belongs_to :entity, :polymorphic => true
  has_one_attached :file
  delegate_missing_to :file
  
end
