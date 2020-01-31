class Polstest < ApplicationRecord
    validates :pol, presence: true
    validates :name, presence: true
end
