local Monster = {}

function Monster:init(sound)
    local m = {}
    self.__index = self
    setmetatable(m, self)
    -- user code
    m.sound = sound
    -- return the instance
    return m
end

function Monster:makeSound()
    print(self.sound)
end

local Goblin = Monster:init()

function Goblin:init()
    local m = Monster:init('hihi')
    self.__index = self
    setmetatable(m, self)
end

